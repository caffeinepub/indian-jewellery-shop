import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import BlobStorage "blob-storage/Storage";

actor {
  /// Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  /// Storage
  include MixinStorage();

  // Types
  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    priceINR : Float;
    category : Text;
    image : ?BlobStorage.ExternalBlob;
    featured : Bool;
    createdAt : Int;
  };

  type StoreInfo = {
    name : Text;
    tagline : Text;
    address : Text;
    phone : Text;
    whatsapp : Text;
    email : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  module Product {
    public func compare(p1 : Product, p2 : Product) : { #less; #equal; #greater } {
      Nat.compare(p1.id, p2.id);
    };
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // Store Information
  var storeInfo : StoreInfo = {
    name = "Akshaya Jewels";
    tagline = "Timeless Indian Elegance";
    address = "456 Gold Road, Mumbai, India";
    phone = "+91 9922334455";
    whatsapp = "+91 9922334455";
    email = "info@akshayajewels.in";
  };

  // Product Management
  let products = Map.empty<Nat, Product>();
  var nextProductId = 13;

  // Sample Data Initialization
  func initializeSampleProducts() {
    let sampleProducts : [Product] = [
      {
        id = 1;
        name = "Kundan Bridal Necklace Set";
        description = "Exquisite Kundan work necklace set with matching earrings and maang tikka.";
        priceINR = 85000.0;
        category = "Necklaces";
        image = null;
        featured = true;
        createdAt = Time.now();
      },
      {
        id = 2;
        name = "Temple Gold Jhumkas";
        description = "Traditional South Indian temple gold earrings with intricate carvings.";
        priceINR = 22500.0;
        category = "Earrings";
        image = null;
        featured = false;
        createdAt = Time.now();
      },
      {
        id = 3;
        name = "Polki Diamond Bangle Set";
        description = "Elegant Polki diamond bangles crafted with 22K gold.";
        priceINR = 145000.0;
        category = "Bangles";
        image = null;
        featured = true;
        createdAt = Time.now();
      },
      {
        id = 4;
        name = "Meenakari Ruby Ring";
        description = "Stunning Meenakari work ring featuring a central ruby gemstone.";
        priceINR = 18000.0;
        category = "Rings";
        image = null;
        featured = false;
        createdAt = Time.now();
      },
      {
        id = 5;
        name = "Pearl Chandbali Earrings";
        description = "Delicate pearl and gold chandbali style earrings.";
        priceINR = 32000.0;
        category = "Earrings";
        image = null;
        featured = false;
        createdAt = Time.now();
      },
      {
        id = 6;
        name = "Navratna Pendant Set";
        description = "Vibrant navratna stones pendant with matching earrings.";
        priceINR = 65000.0;
        category = "Necklaces";
        image = null;
        featured = true;
        createdAt = Time.now();
      },
      {
        id = 7;
        name = "Silver Payal Anklets";
        description = "Classic silver payal anklets with traditional ghungroo accents.";
        priceINR = 4200.0;
        category = "Anklets";
        image = null;
        featured = false;
        createdAt = Time.now();
      },
      {
        id = 8;
        name = "Victorian Diamond Bracelet";
        description = "Elegant Victorian-era inspired bracelet with diamond accents.";
        priceINR = 91000.0;
        category = "Bangles";
        image = null;
        featured = false;
        createdAt = Time.now();
      },
      {
        id = 9;
        name = "Pearl Maang Tikka";
        description = "Graceful pearl-studded maang tikka with gold chain.";
        priceINR = 7500.0;
        category = "Maang Tikka";
        image = null;
        featured = true;
        createdAt = Time.now();
      },
      {
        id = 10;
        name = "Rose Gold Drop Earrings";
        description = "Trend setting rose gold drop earrings with diamond polki.";
        priceINR = 27500.0;
        category = "Earrings";
        image = null;
        featured = false;
        createdAt = Time.now();
      },
      {
        id = 11;
        name = "Patiala Rani Haar";
        description = "Grand Patiala style raani haar with gold and pearl detailing.";
        priceINR = 150000.0;
        category = "Necklaces";
        image = null;
        featured = true;
        createdAt = Time.now();
      },
      {
        id = 12;
        name = "Platinum Wedding Band";
        description = "Sleek platinum wedding band with embedded diamond accents.";
        priceINR = 39000.0;
        category = "Rings";
        image = null;
        featured = false;
        createdAt = Time.now();
      },
    ];

    for (product in sampleProducts.values()) {
      products.add(product.id, product);
    };
  };

  // Initialize sample products on first deployment
  initializeSampleProducts();

  /// User Profile
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

  /// Store Info
  public query ({ caller }) func getStoreInfo() : async StoreInfo {
    storeInfo;
  };

  public shared ({ caller }) func updateStoreInfo(updatedStoreInfo : StoreInfo) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update store info");
    };
    storeInfo := updatedStoreInfo;
  };

  /// Product
  public shared ({ caller }) func createProduct(productData : Product) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };
    let newProduct : Product = {
      productData with
      id = nextProductId;
      createdAt = Time.now();
    };
    products.add(nextProductId, newProduct);
    nextProductId += 1;
    newProduct.id;
  };

  public shared ({ caller }) func updateProduct(productId : Nat, updatedProduct : Product) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };

    let existingProduct = switch (products.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
    let newProduct : Product = {
      existingProduct with
      name = updatedProduct.name;
      description = updatedProduct.description;
      priceINR = updatedProduct.priceINR;
      category = updatedProduct.category;
      image = updatedProduct.image;
      featured = updatedProduct.featured;
    };
    products.add(productId, newProduct);
  };

  public shared ({ caller }) func deleteProduct(productId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    if (not products.containsKey(productId)) {
      Runtime.trap("Product not found");
    };
    products.remove(productId);
  };

  public query ({ caller }) func getProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    products.values().toArray().filter(
      func(p) {
        Text.equal(p.category, category);
      }
    ).sort();
  };

  public query ({ caller }) func getFeaturedProducts() : async [Product] {
    products.values().toArray().filter(
      func(p) { p.featured }
    );
  };

  public query ({ caller }) func getProduct(productId : Nat) : async Product {
    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };
};
