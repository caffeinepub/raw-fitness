import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useClaimFirstAdmin,
  useCreateMembershipPlan,
  useCreateTrainer,
  useCreateTransformation,
  useGetMembershipPlans,
  useGetTrainers,
  useGetTransformations,
  useHasAnyAdmin,
  useInitializeDefaultData,
  useIsCallerAdmin,
} from "@/hooks/useQueries";
import {
  Check,
  CheckCircle2,
  CreditCard,
  Dumbbell,
  LayoutDashboard,
  Loader2,
  LogOut,
  MessageSquare,
  Pencil,
  Plus,
  ShieldAlert,
  ShieldCheck,
  Star,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type Tab = "plans" | "trainers" | "transformations" | "contacts" | "reviews";

function LoginGate({ onLogin }: { onLogin: () => void }) {
  const { login, isLoggingIn, isInitializing } = useInternetIdentity();

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex w-16 h-16 bg-brand-primary rounded-xl items-center justify-center mb-4">
            <Dumbbell className="w-9 h-9 text-brand-dark" />
          </div>
          <h1 className="font-heading font-bold text-3xl text-white uppercase tracking-wider">
            RAW <span className="text-brand-primary">FITNESS</span>
          </h1>
          <p className="text-brand-muted text-sm mt-2">Admin Panel</p>
        </div>

        <div className="bg-brand-card border border-brand-border rounded-xl p-8 shadow-card-hover">
          <h2 className="font-heading font-bold uppercase text-xl text-white tracking-wider mb-2">
            Admin Login
          </h2>
          <p className="text-brand-muted text-sm mb-8">
            Sign in with Internet Identity to access the admin panel.
          </p>
          <Button
            onClick={() => {
              login();
              onLogin();
            }}
            disabled={isLoggingIn || isInitializing}
            className="w-full bg-brand-primary text-brand-dark font-heading font-bold uppercase tracking-widest hover:bg-brand-olive h-12 text-sm"
            data-ocid="admin.primary_button"
          >
            {isLoggingIn || isInitializing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Connecting...
              </>
            ) : (
              "Login with Internet Identity"
            )}
          </Button>
        </div>

        <p className="text-center text-brand-muted text-xs mt-6">
          <a href="/" className="hover:text-brand-primary transition-colors">
            ← Back to website
          </a>
        </p>
      </div>
    </div>
  );
}

function AccessDenied() {
  const { clear } = useInternetIdentity();
  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
      <div className="text-center">
        <ShieldAlert className="w-20 h-20 text-red-500 mx-auto mb-6" />
        <h2 className="font-heading font-bold text-2xl text-white uppercase tracking-wider mb-2">
          Access Denied
        </h2>
        <p className="text-brand-muted mb-6">
          Your account does not have admin privileges.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => clear()}
            variant="outline"
            className="border-brand-border text-brand-muted hover:text-white"
          >
            Logout
          </Button>
          <Button
            onClick={() => {
              window.location.href = "/";
            }}
            className="bg-brand-primary text-brand-dark hover:bg-brand-olive font-heading font-bold uppercase"
          >
            Back to Site
          </Button>
        </div>
      </div>
    </div>
  );
}

function FirstRunSetup() {
  const { identity } = useInternetIdentity();
  const claimAdmin = useClaimFirstAdmin();
  const [claimed, setClaimed] = useState(false);

  const principal = identity?.getPrincipal().toText() ?? "";

  const handleClaim = async () => {
    try {
      await claimAdmin.mutateAsync();
      setClaimed(true);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch {
      toast.error("Failed to claim admin access. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header branding */}
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 bg-brand-primary rounded-xl items-center justify-center mb-4">
            <Dumbbell className="w-9 h-9 text-brand-dark" />
          </div>
          <h1 className="font-heading font-bold text-3xl text-white uppercase tracking-wider">
            RAW <span className="text-brand-primary">FITNESS</span>
          </h1>
          <p className="text-brand-muted text-sm mt-2">Admin Panel</p>
        </div>

        <div className="bg-brand-card border border-brand-border rounded-xl p-8 shadow-card-hover">
          {claimed ? (
            // Success state
            <div
              className="text-center py-4"
              data-ocid="admin.setup.success_state"
            >
              <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="font-heading font-bold text-xl text-white uppercase tracking-wider mb-2">
                Admin Access Claimed!
              </h2>
              <p className="text-brand-muted text-sm">
                Reloading admin panel...
              </p>
              <div className="mt-4">
                <Loader2 className="w-5 h-5 text-brand-primary animate-spin mx-auto" />
              </div>
            </div>
          ) : (
            // Setup form
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-brand-primary" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-xl text-white uppercase tracking-wider leading-tight">
                    First-Time Setup
                  </h2>
                  <p className="text-brand-primary text-xs font-heading uppercase tracking-widest">
                    Initial Configuration
                  </p>
                </div>
              </div>

              <p className="text-brand-muted text-sm leading-relaxed mb-6">
                No admin has been configured yet. As the first user, you can
                claim admin access for this gym website.
              </p>

              <div className="mb-6">
                <Label className="text-brand-muted text-xs uppercase tracking-widest font-heading mb-2 block">
                  Your Internet Identity Principal
                </Label>
                <div
                  className="bg-brand-dark border border-brand-border rounded-lg px-4 py-3 font-mono text-xs text-brand-primary break-all leading-relaxed"
                  data-ocid="admin.setup.panel"
                >
                  {principal || (
                    <span className="text-brand-muted italic">
                      Loading principal...
                    </span>
                  )}
                </div>
                <p className="text-brand-muted text-xs mt-2">
                  This principal will be granted admin privileges.
                </p>
              </div>

              <Button
                onClick={handleClaim}
                disabled={claimAdmin.isPending || !principal}
                className="w-full bg-brand-primary text-brand-dark font-heading font-bold uppercase tracking-widest hover:bg-brand-olive h-12 text-sm"
                data-ocid="admin.setup.primary_button"
              >
                {claimAdmin.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Claiming Access...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    Claim Admin Access
                  </>
                )}
              </Button>

              <p className="text-center text-brand-muted text-xs mt-4">
                <a
                  href="/"
                  className="hover:text-brand-primary transition-colors"
                >
                  ← Back to website
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Plans Tab ---
function PlansTab() {
  const { data: plans, isLoading } = useGetMembershipPlans();
  const createPlan = useCreateMembershipPlan();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    period: "/mo",
    featured: false,
    features: "",
  });

  const handleCreate = async () => {
    if (!form.name || !form.price) {
      toast.error("Name and price are required.");
      return;
    }
    try {
      await createPlan.mutateAsync({
        name: form.name,
        price: form.price,
        period: form.period,
        featured: form.featured,
        features: form.features
          .split("\n")
          .map((f) => f.trim())
          .filter(Boolean),
      });
      toast.success("Membership plan created!");
      setOpen(false);
      setForm({
        name: "",
        price: "",
        period: "/mo",
        featured: false,
        features: "",
      });
    } catch {
      toast.error("Failed to create plan.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-bold text-xl text-white uppercase tracking-wider">
          Membership Plans
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-brand-primary text-brand-dark hover:bg-brand-olive font-heading font-bold uppercase text-xs tracking-widest"
              data-ocid="admin.plans.open_modal_button"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Plan
            </Button>
          </DialogTrigger>
          <DialogContent
            className="bg-brand-card border-brand-border text-white max-w-md"
            data-ocid="admin.plans.dialog"
          >
            <DialogHeader>
              <DialogTitle className="font-heading font-bold uppercase tracking-wider text-white">
                New Membership Plan
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div>
                <Label className="text-brand-muted text-xs uppercase tracking-widest font-heading">
                  Plan Name *
                </Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="e.g. Basic"
                  className="bg-brand-dark border-brand-border text-white mt-1"
                  data-ocid="admin.plans.input"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-brand-muted text-xs uppercase tracking-widest font-heading">
                    Price *
                  </Label>
                  <Input
                    value={form.price}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, price: e.target.value }))
                    }
                    placeholder="₹999"
                    className="bg-brand-dark border-brand-border text-white mt-1"
                    data-ocid="admin.plans.input"
                  />
                </div>
                <div>
                  <Label className="text-brand-muted text-xs uppercase tracking-widest font-heading">
                    Period
                  </Label>
                  <Input
                    value={form.period}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, period: e.target.value }))
                    }
                    placeholder="/mo"
                    className="bg-brand-dark border-brand-border text-white mt-1"
                  />
                </div>
              </div>
              <div>
                <Label className="text-brand-muted text-xs uppercase tracking-widest font-heading">
                  Features (one per line)
                </Label>
                <Textarea
                  value={form.features}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, features: e.target.value }))
                  }
                  placeholder={"Full Gym Access\nLocker Room\nGroup Classes"}
                  rows={4}
                  className="bg-brand-dark border-brand-border text-white mt-1 resize-none"
                  data-ocid="admin.plans.textarea"
                />
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={form.featured}
                  onCheckedChange={(v) =>
                    setForm((p) => ({ ...p, featured: v }))
                  }
                  data-ocid="admin.plans.switch"
                />
                <Label className="text-white text-sm">
                  Featured / Most Popular
                </Label>
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleCreate}
                  disabled={createPlan.isPending}
                  className="flex-1 bg-brand-primary text-brand-dark hover:bg-brand-olive font-heading font-bold uppercase"
                  data-ocid="admin.plans.submit_button"
                >
                  {createPlan.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Create Plan"
                  )}
                </Button>
                <Button
                  onClick={() => setOpen(false)}
                  variant="outline"
                  className="border-brand-border text-brand-muted"
                  data-ocid="admin.plans.cancel_button"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 bg-brand-olive/40 rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="space-y-3" data-ocid="admin.plans.list">
          {(plans ?? []).length === 0 ? (
            <div
              className="text-center py-16 bg-brand-card border border-brand-border rounded-lg"
              data-ocid="admin.plans.empty_state"
            >
              <CreditCard className="w-12 h-12 text-brand-olive mx-auto mb-3" />
              <p className="text-brand-muted">
                No membership plans yet. Add your first plan.
              </p>
            </div>
          ) : (
            (plans ?? []).map((plan, i) => (
              <div
                key={String(plan.id)}
                className="bg-brand-card border border-brand-border rounded-lg p-5 flex items-center justify-between group hover:border-brand-primary/40 transition-colors"
                data-ocid={`admin.plans.row.${i + 1}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-white uppercase tracking-wider">
                        {plan.name}
                      </span>
                      {plan.featured && (
                        <span className="bg-brand-primary text-brand-dark text-xs font-heading font-bold uppercase px-2 py-0.5 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-brand-muted text-sm">
                      {plan.price}
                      {plan.period} · {plan.features.length} features
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-brand-border text-brand-muted hover:text-brand-primary hover:border-brand-primary"
                    onClick={() => toast.info("Edit feature coming soon")}
                    data-ocid={`admin.plans.edit_button.${i + 1}`}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-brand-border text-brand-muted hover:text-red-400 hover:border-red-400"
                    onClick={() =>
                      toast.info("Contact support to delete plans")
                    }
                    data-ocid={`admin.plans.delete_button.${i + 1}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// --- Trainers Tab ---
function TrainersTab() {
  const { data: trainers, isLoading } = useGetTrainers();
  const createTrainer = useCreateTrainer();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    experience: "",
    cert: "",
    bio: "",
    imageUrl: "",
  });

  const handleCreate = async () => {
    if (!form.name || !form.title) {
      toast.error("Name and title are required.");
      return;
    }
    try {
      await createTrainer.mutateAsync(form);
      toast.success("Trainer added!");
      setOpen(false);
      setForm({
        name: "",
        title: "",
        experience: "",
        cert: "",
        bio: "",
        imageUrl: "",
      });
    } catch {
      toast.error("Failed to add trainer.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-bold text-xl text-white uppercase tracking-wider">
          Trainers
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-brand-primary text-brand-dark hover:bg-brand-olive font-heading font-bold uppercase text-xs tracking-widest"
              data-ocid="admin.trainers.open_modal_button"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Trainer
            </Button>
          </DialogTrigger>
          <DialogContent
            className="bg-brand-card border-brand-border text-white max-w-md"
            data-ocid="admin.trainers.dialog"
          >
            <DialogHeader>
              <DialogTitle className="font-heading font-bold uppercase tracking-wider text-white">
                New Trainer
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-brand-muted text-xs uppercase tracking-widest font-heading">
                    Name *
                  </Label>
                  <Input
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Marcus Steel"
                    className="bg-brand-dark border-brand-border text-white mt-1"
                    data-ocid="admin.trainers.input"
                  />
                </div>
                <div>
                  <Label className="text-brand-muted text-xs uppercase tracking-widest font-heading">
                    Title *
                  </Label>
                  <Input
                    value={form.title}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, title: e.target.value }))
                    }
                    placeholder="Strength Coach"
                    className="bg-brand-dark border-brand-border text-white mt-1"
                    data-ocid="admin.trainers.input"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-brand-muted text-xs uppercase tracking-widest font-heading">
                    Experience
                  </Label>
                  <Input
                    value={form.experience}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, experience: e.target.value }))
                    }
                    placeholder="8 Years"
                    className="bg-brand-dark border-brand-border text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-brand-muted text-xs uppercase tracking-widest font-heading">
                    Certification
                  </Label>
                  <Input
                    value={form.cert}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, cert: e.target.value }))
                    }
                    placeholder="NSCA Certified"
                    className="bg-brand-dark border-brand-border text-white mt-1"
                  />
                </div>
              </div>
              <div>
                <Label className="text-brand-muted text-xs uppercase tracking-widest font-heading">
                  Bio
                </Label>
                <Textarea
                  value={form.bio}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, bio: e.target.value }))
                  }
                  placeholder="Short trainer bio..."
                  rows={3}
                  className="bg-brand-dark border-brand-border text-white mt-1 resize-none"
                  data-ocid="admin.trainers.textarea"
                />
              </div>
              <div>
                <Label className="text-brand-muted text-xs uppercase tracking-widest font-heading">
                  Image URL
                </Label>
                <Input
                  value={form.imageUrl}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, imageUrl: e.target.value }))
                  }
                  placeholder="https://..."
                  className="bg-brand-dark border-brand-border text-white mt-1"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleCreate}
                  disabled={createTrainer.isPending}
                  className="flex-1 bg-brand-primary text-brand-dark hover:bg-brand-olive font-heading font-bold uppercase"
                  data-ocid="admin.trainers.submit_button"
                >
                  {createTrainer.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Add Trainer"
                  )}
                </Button>
                <Button
                  onClick={() => setOpen(false)}
                  variant="outline"
                  className="border-brand-border text-brand-muted"
                  data-ocid="admin.trainers.cancel_button"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-28 bg-brand-olive/40 rounded-lg" />
          ))}
        </div>
      ) : (
        <div
          className="grid sm:grid-cols-2 gap-4"
          data-ocid="admin.trainers.list"
        >
          {(trainers ?? []).length === 0 ? (
            <div
              className="col-span-2 text-center py-16 bg-brand-card border border-brand-border rounded-lg"
              data-ocid="admin.trainers.empty_state"
            >
              <Users className="w-12 h-12 text-brand-olive mx-auto mb-3" />
              <p className="text-brand-muted">
                No trainers yet. Add your first trainer.
              </p>
            </div>
          ) : (
            (trainers ?? []).map((trainer, i) => (
              <div
                key={String(trainer.id)}
                className="bg-brand-card border border-brand-border rounded-lg p-5 flex items-start justify-between group hover:border-brand-primary/40 transition-colors"
                data-ocid={`admin.trainers.row.${i + 1}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-brand-olive/30 border border-brand-border flex-shrink-0 overflow-hidden">
                    {trainer.imageUrl ? (
                      <img
                        src={trainer.imageUrl}
                        alt={trainer.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-heading text-xl text-brand-primary">
                          {trainer.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-white uppercase tracking-wider">
                      {trainer.name}
                    </p>
                    <p className="text-brand-primary text-xs font-semibold">
                      {trainer.title}
                    </p>
                    <p className="text-brand-muted text-xs mt-0.5">
                      {trainer.experience} · {trainer.cert}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-brand-border text-brand-muted hover:text-brand-primary hover:border-brand-primary"
                    onClick={() => toast.info("Edit feature coming soon")}
                    data-ocid={`admin.trainers.edit_button.${i + 1}`}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-brand-border text-brand-muted hover:text-red-400 hover:border-red-400"
                    onClick={() =>
                      toast.info("Contact support to delete trainers")
                    }
                    data-ocid={`admin.trainers.delete_button.${i + 1}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// --- Transformations Tab ---
function TransformationsTab() {
  const { data: transformations, isLoading } = useGetTransformations();
  const createTransformation = useCreateTransformation();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", result: "", duration: "" });

  const handleCreate = async () => {
    if (!form.name || !form.result) {
      toast.error("Name and result are required.");
      return;
    }
    try {
      await createTransformation.mutateAsync(form);
      toast.success("Transformation added!");
      setOpen(false);
      setForm({ name: "", result: "", duration: "" });
    } catch {
      toast.error("Failed to add transformation.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-bold text-xl text-white uppercase tracking-wider">
          Transformations
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-brand-primary text-brand-dark hover:bg-brand-olive font-heading font-bold uppercase text-xs tracking-widest"
              data-ocid="admin.transformations.open_modal_button"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Transformation
            </Button>
          </DialogTrigger>
          <DialogContent
            className="bg-brand-card border-brand-border text-white max-w-md"
            data-ocid="admin.transformations.dialog"
          >
            <DialogHeader>
              <DialogTitle className="font-heading font-bold uppercase tracking-wider text-white">
                New Transformation
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div>
                <Label className="text-brand-muted text-xs uppercase tracking-widest font-heading">
                  Member Name *
                </Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Alex M."
                  className="bg-brand-dark border-brand-border text-white mt-1"
                  data-ocid="admin.transformations.input"
                />
              </div>
              <div>
                <Label className="text-brand-muted text-xs uppercase tracking-widest font-heading">
                  Result *
                </Label>
                <Input
                  value={form.result}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, result: e.target.value }))
                  }
                  placeholder="Lost 35 lbs"
                  className="bg-brand-dark border-brand-border text-white mt-1"
                  data-ocid="admin.transformations.input"
                />
              </div>
              <div>
                <Label className="text-brand-muted text-xs uppercase tracking-widest font-heading">
                  Duration
                </Label>
                <Input
                  value={form.duration}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, duration: e.target.value }))
                  }
                  placeholder="4 months"
                  className="bg-brand-dark border-brand-border text-white mt-1"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleCreate}
                  disabled={createTransformation.isPending}
                  className="flex-1 bg-brand-primary text-brand-dark hover:bg-brand-olive font-heading font-bold uppercase"
                  data-ocid="admin.transformations.submit_button"
                >
                  {createTransformation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Add Transformation"
                  )}
                </Button>
                <Button
                  onClick={() => setOpen(false)}
                  variant="outline"
                  className="border-brand-border text-brand-muted"
                  data-ocid="admin.transformations.cancel_button"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 bg-brand-olive/40 rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="space-y-3" data-ocid="admin.transformations.list">
          {(transformations ?? []).length === 0 ? (
            <div
              className="text-center py-16 bg-brand-card border border-brand-border rounded-lg"
              data-ocid="admin.transformations.empty_state"
            >
              <TrendingUp className="w-12 h-12 text-brand-olive mx-auto mb-3" />
              <p className="text-brand-muted">
                No transformations yet. Add your first one.
              </p>
            </div>
          ) : (
            (transformations ?? []).map((t, i) => (
              <div
                key={String(t.id)}
                className="bg-brand-card border border-brand-border rounded-lg p-5 flex items-center justify-between group hover:border-brand-primary/40 transition-colors"
                data-ocid={`admin.transformations.row.${i + 1}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-white uppercase tracking-wider">
                      {t.name}
                    </p>
                    <p className="text-brand-muted text-sm">
                      {t.result} · {t.duration}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-brand-border text-brand-muted hover:text-brand-primary hover:border-brand-primary"
                    onClick={() => toast.info("Edit feature coming soon")}
                    data-ocid={`admin.transformations.edit_button.${i + 1}`}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-brand-border text-brand-muted hover:text-red-400 hover:border-red-400"
                    onClick={() =>
                      toast.info("Contact support to delete entries")
                    }
                    data-ocid={`admin.transformations.delete_button.${i + 1}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// --- Contacts Tab ---
function ContactsTab() {
  return (
    <div>
      <h2 className="font-heading font-bold text-xl text-white uppercase tracking-wider mb-6">
        Contact Submissions
      </h2>
      <div
        className="text-center py-20 bg-brand-card border border-brand-border rounded-lg"
        data-ocid="admin.contacts.empty_state"
      >
        <MessageSquare className="w-16 h-16 text-brand-olive mx-auto mb-4" />
        <h3 className="font-heading font-bold text-white uppercase tracking-wider text-lg mb-2">
          No Submissions Yet
        </h3>
        <p className="text-brand-muted max-w-sm mx-auto">
          Contact form submissions from website visitors will appear here once
          the feature is enabled.
        </p>
      </div>
    </div>
  );
}

// --- Reviews Tab ---
function ReviewsTab() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const widgetId = "JFWebsiteWidget-019d057c3925789fa89add598845db656417";
    const scriptSrc =
      "https://www.jotform.com/website-widgets/embed/019d057c3925789fa89add598845db656417";

    // Remove any existing script to avoid duplicates
    const existing = document.querySelector(`script[src="${scriptSrc}"]`);
    if (existing) existing.remove();

    // Ensure div exists
    if (containerRef.current) {
      const div = document.createElement("div");
      div.id = widgetId;
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(div);
    }

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div>
      <h2 className="font-heading font-bold text-xl text-white uppercase tracking-wider mb-6">
        Google Maps Reviews
      </h2>
      <div className="bg-brand-card border border-brand-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-brand-primary" />
          <p className="text-brand-muted text-sm">
            Embed powered by JotForm — displays your Google Maps reviews widget.
          </p>
        </div>
        <div
          ref={containerRef}
          className="min-h-64"
          data-ocid="admin.reviews.panel"
        />
      </div>
    </div>
  );
}

// --- Main AdminPanel ---
export default function AdminPanel() {
  const { identity, isInitializing } = useInternetIdentity();
  const { isFetching: actorFetching } = useActor();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();
  const { data: hasAnyAdmin, isLoading: hasAnyAdminLoading } = useHasAnyAdmin();
  const initData = useInitializeDefaultData();
  const [activeTab, setActiveTab] = useState<Tab>("plans");
  const [initiated, setInitiated] = useState(false);

  // Initialize data once on first admin login
  useEffect(() => {
    if (isAdmin && !initiated && !initData.isPending) {
      setInitiated(true);
      initData.mutate();
    }
  }, [isAdmin, initiated, initData]);

  if (isInitializing || actorFetching) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-brand-primary animate-spin mx-auto mb-4" />
          <p className="text-brand-muted font-heading uppercase tracking-widest text-sm">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginGate onLogin={() => {}} />;
  }

  if (adminLoading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-brand-primary animate-spin mx-auto mb-4" />
          <p className="text-brand-muted font-heading uppercase tracking-widest text-sm">
            Verifying access...
          </p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    // Check if anyone is admin yet; if not, show first-run setup
    if (hasAnyAdminLoading) {
      return (
        <div className="min-h-screen bg-brand-dark flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-10 h-10 text-brand-primary animate-spin mx-auto mb-4" />
            <p className="text-brand-muted font-heading uppercase tracking-widest text-sm">
              Verifying access...
            </p>
          </div>
        </div>
      );
    }
    if (!hasAnyAdmin) {
      return <FirstRunSetup />;
    }
    return <AccessDenied />;
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "plans", label: "Plans", icon: <CreditCard className="w-4 h-4" /> },
    { id: "trainers", label: "Trainers", icon: <Users className="w-4 h-4" /> },
    {
      id: "transformations",
      label: "Transformations",
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      id: "contacts",
      label: "Contacts",
      icon: <MessageSquare className="w-4 h-4" />,
    },
    { id: "reviews", label: "Reviews", icon: <Star className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-brand-dark flex">
      {/* Sidebar */}
      <aside
        className="w-64 bg-brand-darker border-r border-brand-border flex flex-col fixed h-full hidden md:flex"
        data-ocid="admin.panel"
      >
        <div className="p-6 border-b border-brand-border">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-brand-primary rounded flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-brand-dark" />
            </div>
            <span className="font-heading font-bold text-white uppercase tracking-wider text-sm">
              RAW <span className="text-brand-primary">FITNESS</span>
            </span>
          </div>
          <p className="text-brand-muted text-xs">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-heading text-xs uppercase tracking-widest transition-all duration-200 text-left ${
                activeTab === tab.id
                  ? "bg-brand-primary text-brand-dark font-bold"
                  : "text-brand-muted hover:text-white hover:bg-white/5"
              }`}
              data-ocid={`admin.${tab.id}.tab`}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && <Check className="w-3 h-3 ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-brand-border space-y-2">
          <a
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-heading text-xs uppercase tracking-widest text-brand-muted hover:text-white hover:bg-white/5 transition-all duration-200"
            data-ocid="admin.link"
          >
            <LayoutDashboard className="w-4 h-4" />
            View Site
          </a>
          <LogoutButton />
        </div>
      </aside>

      {/* Mobile Top Nav */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-brand-darker border-b border-brand-border">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand-primary rounded flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-brand-dark" />
            </div>
            <span className="font-heading font-bold text-white uppercase tracking-wider text-sm">
              RAW <span className="text-brand-primary">FITNESS</span>
            </span>
          </div>
          <LogoutButton compact />
        </div>
        <div className="flex overflow-x-auto border-t border-brand-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 font-heading text-xs uppercase tracking-wider whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab.id
                  ? "text-brand-primary border-brand-primary"
                  : "text-brand-muted border-transparent hover:text-white"
              }`}
              data-ocid={`admin.${tab.id}.tab`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 md:ml-64 pt-24 md:pt-0 p-6 lg:p-10 overflow-auto">
        {activeTab === "plans" && <PlansTab />}
        {activeTab === "trainers" && <TrainersTab />}
        {activeTab === "transformations" && <TransformationsTab />}
        {activeTab === "contacts" && <ContactsTab />}
        {activeTab === "reviews" && <ReviewsTab />}
      </main>
    </div>
  );
}

function LogoutButton({ compact }: { compact?: boolean }) {
  const { clear } = useInternetIdentity();
  if (compact) {
    return (
      <button
        type="button"
        onClick={() => {
          clear();
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded font-heading text-xs uppercase tracking-wider text-brand-muted hover:text-red-400 transition-colors"
        data-ocid="admin.secondary_button"
      >
        <LogOut className="w-3.5 h-3.5" />
        Logout
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={() => {
        clear();
      }}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-heading text-xs uppercase tracking-widest text-brand-muted hover:text-red-400 hover:bg-red-500/5 transition-all duration-200"
      data-ocid="admin.secondary_button"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </button>
  );
}
