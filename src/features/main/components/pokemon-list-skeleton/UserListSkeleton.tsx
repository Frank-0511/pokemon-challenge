import { Skeleton } from "@/shared/components";

interface PokemonListSkeletonProps {
  count?: number;
}

export const PokemonListSkeleton = ({
  count = 5,
}: PokemonListSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-6">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="card shadow-xl border-primary"
            style={{
              width: `258px`,
              height: `254px`,
            }}
          >
            <div className="flex justify-center mt-6">
              <Skeleton width="80px" height="80px" className="rounded-full" />
            </div>
            <div className="card-body items-center text-center">
              <Skeleton width="80%" height="1.25rem" className="mt-2" />
              <div className="mt-4">
                <Skeleton
                  width="118px"
                  height="48px"
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
