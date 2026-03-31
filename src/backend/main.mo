import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";



actor {
  type MembershipPlan = {
    id : Nat;
    name : Text;
    price : Text;
    period : Text;
    featured : Bool;
    features : [Text];
  };

  type Trainer = {
    id : Nat;
    name : Text;
    title : Text;
    experience : Text;
    cert : Text;
    bio : Text;
    imageUrl : Text;
  };

  type Transformation = {
    id : Nat;
    name : Text;
    result : Text;
    duration : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  type Contact = {
    name : Text;
    phone : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type PlanInterest = {
    plan : Text;
    contact : Text;
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  var adminInitialized = false;

  var nextPlanId = 1;
  var nextTrainerId = 1;
  var nextTransformationId = 1;

  let membershipPlans = Map.empty<Nat, MembershipPlan>();
  let trainers = Map.empty<Nat, Trainer>();
  let transformations = Map.empty<Nat, Transformation>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Returns true if at least one admin has been assigned
  public query func hasAnyAdmin() : async Bool {
    adminInitialized;
  };

  // First-run setup: caller becomes admin only if no admin exists yet
  public shared ({ caller }) func claimFirstAdmin() : async () {
    if (adminInitialized) {
      Runtime.trap("Admin already exists. First-run setup is not available.");
    };
    AccessControl.assignRole(accessControlState, caller, caller, #admin);
    adminInitialized := true;
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };

    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func initializeDefaultData() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can initialize data");
    };

    let defaultPlans = [
      {
        id = nextPlanId;
        name = "Per Month";
        price = "\u{20B9}999";
        period = "/mo";
        featured = false;
        features = [
          "Full Gym Access",
          "Group Exercise Classes",
          "Free Weights & Cardio",
        ];
      },
      {
        id = nextPlanId + 1;
        name = "Per 6 Months";
        price = "\u{20B9}5000";
        period = "/6 mo";
        featured = true;
        features = [
          "Personalized Training",
          "Body Composition Analysis",
          "Priority Class Booking",
        ];
      },
      {
        id = nextPlanId + 2;
        name = "Per Year";
        price = "\u{20B9}9000";
        period = "/year";
        featured = false;
        features = [
          "Nutritional Guidance",
          "Personal Locker",
          "24/7 Access",
        ];
      },
    ];
    let defaultTrainers = [
      {
        id = nextTrainerId;
        name = "Rohit Patil";
        title = "Certified Fitness Coach";
        experience = "10+ Years Experience";
        cert = "ISSA Certified";
        bio = "Specialized in Strength & Conditioning";
        imageUrl = "";
      },
      {
        id = nextTrainerId + 1;
        name = "Priya Sharma";
        title = "Personal Trainer";
        experience = "7 Years Experience";
        cert = "Fitness Certification Program";
        bio = "Expert in Nutrition & Weight Loss";
        imageUrl = "";
      },
      {
        id = nextTrainerId + 2;
        name = "Amit Singh";
        title = "Strength & Conditioning Specialist";
        experience = "12 Years Experience";
        cert = "Various Certifications";
        bio = "Focus on Athletic Performance & Injury Prevention";
        imageUrl = "";
      },
    ];

    let defaultTransformations = [
      { id = nextTransformationId; name = "Gopal"; result = "Muscle Growth"; duration = "8 months" },
      { id = nextTransformationId + 1; name = "Roshan"; result = "Muscle Growth"; duration = "11 months" },
      { id = nextTransformationId + 2; name = "Samadhan"; result = "Muscle Gain"; duration = "2 years" },
      { id = nextTransformationId + 3; name = "Nagesh"; result = "Muscle Gain"; duration = "2.5 years" },
      { id = nextTransformationId + 4; name = "Rahul"; result = "Weight Loss"; duration = "7 months" },
      { id = nextTransformationId + 5; name = "Mahesh"; result = "Weight Loss"; duration = "8 months" },
    ];

    for (plan in defaultPlans.values()) {
      membershipPlans.add(plan.id, plan);
    };
    for (trainer in defaultTrainers.values()) {
      trainers.add(trainer.id, trainer);
    };
    for (transformation in defaultTransformations.values()) {
      transformations.add(transformation.id, transformation);
    };

    nextPlanId += 3;
    nextTrainerId += 3;
    nextTransformationId += 6;
  };

  public shared ({ caller }) func createMembershipPlan(name : Text, price : Text, period : Text, featured : Bool, features : [Text]) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create plans");
    };

    let id = nextPlanId;
    let plan = {
      id;
      name;
      price;
      period;
      featured;
      features;
    };
    membershipPlans.add(id, plan);
    nextPlanId += 1;
    id;
  };

  public shared ({ caller }) func createTrainer(name : Text, title : Text, experience : Text, cert : Text, bio : Text, imageUrl : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create trainers");
    };

    let id = nextTrainerId;
    let trainer = {
      id;
      name;
      title;
      experience;
      cert;
      bio;
      imageUrl;
    };
    trainers.add(id, trainer);
    nextTrainerId += 1;
    id;
  };

  public shared ({ caller }) func createTransformation(name : Text, result : Text, duration : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create transformations");
    };

    let id = nextTransformationId;
    let transformation = {
      id;
      name;
      result;
      duration;
    };
    transformations.add(id, transformation);
    nextTransformationId += 1;
    id;
  };

  public query ({ caller }) func getMembershipPlans() : async [MembershipPlan] {
    membershipPlans.values().toArray();
  };

  public query ({ caller }) func getTrainers() : async [Trainer] {
    trainers.values().toArray();
  };

  public query ({ caller }) func getTransformations() : async [Transformation] {
    transformations.values().toArray();
  };

  public query ({ caller }) func getMembershipPlanById(id : Nat) : async ?MembershipPlan {
    membershipPlans.get(id);
  };

  public query ({ caller }) func getTrainerById(id : Nat) : async ?Trainer {
    trainers.get(id);
  };

  public query ({ caller }) func getTransformationById(id : Nat) : async ?Transformation {
    transformations.get(id);
  };
};
