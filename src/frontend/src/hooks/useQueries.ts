import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

// Extended actor type to include new backend methods
type ExtendedActor = ReturnType<typeof useActor>["actor"] & {
  hasAnyAdmin(): Promise<boolean>;
  claimFirstAdmin(): Promise<void>;
};

export function useGetMembershipPlans() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["membershipPlans"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMembershipPlans();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTrainers() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTrainers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTransformations() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["transformations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTransformations();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["isCallerAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useHasAnyAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["hasAnyAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return (actor as unknown as ExtendedActor).hasAnyAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useClaimFirstAdmin() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return (actor as unknown as ExtendedActor).claimFirstAdmin();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isCallerAdmin"] });
      queryClient.invalidateQueries({ queryKey: ["hasAnyAdmin"] });
    },
  });
}

export function useCreateMembershipPlan() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (plan: {
      name: string;
      price: string;
      period: string;
      featured: boolean;
      features: string[];
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createMembershipPlan(
        plan.name,
        plan.price,
        plan.period,
        plan.featured,
        plan.features,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["membershipPlans"] });
    },
  });
}

export function useCreateTrainer() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (trainer: {
      name: string;
      title: string;
      experience: string;
      cert: string;
      bio: string;
      imageUrl: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createTrainer(
        trainer.name,
        trainer.title,
        trainer.experience,
        trainer.cert,
        trainer.bio,
        trainer.imageUrl,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trainers"] });
    },
  });
}

export function useCreateTransformation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (t: {
      name: string;
      result: string;
      duration: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createTransformation(t.name, t.result, t.duration);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transformations"] });
    },
  });
}

export function useInitializeDefaultData() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.initializeDefaultData();
    },
  });
}
