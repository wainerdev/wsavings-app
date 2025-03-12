import { useTheme } from "@/hooks/useTheme";
import { MotiView } from "moti";
import { Skeleton as MotiSkeleton } from "moti/skeleton";

interface SkeletonWrapperProps extends React.ComponentProps<typeof MotiView> {
  children?: React.ReactNode;
}

interface SkeletonProps extends React.ComponentProps<typeof MotiSkeleton> {}

export function Skeleton(props: SkeletonProps) {
  const theme = useTheme();
  return (
    <MotiSkeleton
      colorMode={theme.colorScheme === "light" ? "light" : "dark"}
      {...props}
    />
  );
}

export function SkeletonWrapper({ children, ...props }: SkeletonWrapperProps) {
  return (
    <MotiView transition={{ type: "timing" }} {...props}>
      {children}
    </MotiView>
  );
}
