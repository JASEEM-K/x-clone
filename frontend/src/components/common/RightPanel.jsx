import { Link } from "react-router-dom";
import RightPanelSkeleton from "../Skeleton/RightPanelSkeleton";
import { useQuery } from "@tanstack/react-query";
import FollowButton from "./FollowButton";

const RightPanel = () => {
    const { data:suggestedUsers , isLoading } = useQuery({
        queryKey: ['suggestedUsers'], 
        queryFn: async () => {
            try {
                const res = await fetch('/api/user/suggested')
                const data = await res.json()
                if(!res.ok) throw new Error(data.error || "Something went Wrong")
                return data
            } catch (error) {
                throw new Error(error.message),
                console.error("Error in Suggested Users Querry:",error)
            }
        },
    })

    if(suggestedUsers?.length === 0) return(<div className="md:w-64 w-0"></div>)

    return (
        <div className='hidden lg:block my-4 mx-2'>
            <div className='bg-[#16181C] p-4 rounded-md sticky top-2'>
                <p className='font-bold'>Who to follow</p>
                <div className='flex flex-col gap-4 w-64'>
                    {/* item */}
                    {isLoading && (
                        <>
                            <RightPanelSkeleton />
                            <RightPanelSkeleton />
                            <RightPanelSkeleton />
                            <RightPanelSkeleton />
                        </>
                    )}
                    {!isLoading &&
                        suggestedUsers.data?.map((user) => (
                            <Link
                                to={`/profile/${user.username}`}
                                className='flex items-center justify-between gap-4'
                                key={user._id}
                            >
                                <div className='flex gap-2 items-center'>
                                    <div className='avatar'>
                                        <div className='w-8 rounded-full'>
                                            <img src={user.profileImg || "/src/assets/placeholder.bmp"} />
                                        </div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='font-semibold tracking-tight truncate w-28'>
                                            {user.fullName}
                                        </span>
                                        <span className='text-sm text-slate-500'>@{user.username}</span>
                                    </div>
                                </div>
                                <div>
                                    <FollowButton userId={user._id} />
								</div>
							</Link>
						))}
				</div>
			</div>
		</div>
	);
};
export default RightPanel;