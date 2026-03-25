import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../backend";
import type { Product, StoreInfo } from "../backend";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const BURGUNDY = "#2A0715";
const GOLD = "#C8A24A";
const CREAM = "#F6F1EA";

const CATEGORIES = [
  "Necklaces",
  "Earrings",
  "Bangles",
  "Rings",
  "Maang Tikka",
  "Anklets",
  "Bracelets",
  "Pendants",
];

type ProductForm = {
  name: string;
  description: string;
  category: string;
  priceINR: number;
  featured: boolean;
  imageBlob: ExternalBlob | undefined;
};

const emptyForm = (): ProductForm => ({
  name: "",
  description: "",
  category: "Necklaces",
  priceINR: 0,
  featured: false,
  imageBlob: undefined,
});

export default function AdminPage() {
  const { actor } = useActor();
  const { login, isLoggingIn, identity, clear } = useInternetIdentity();

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm());
  const [saving, setSaving] = useState(false);

  const [deleteId, setDeleteId] = useState<bigint | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [storeForm, setStoreForm] = useState<StoreInfo>({
    name: "Viraasa Jewels",
    address: "",
    phone: "",
    whatsapp: "",
    email: "",
    tagline: "",
  });
  const [savingStore, setSavingStore] = useState(false);

  useEffect(() => {
    if (!actor) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (actor as any)
      ._initializeAccessControl()
      .then(() => actor.isCallerAdmin())
      .then(setIsAdmin)
      .catch(() => setIsAdmin(false));
  }, [actor]);

  const loadProducts = () => {
    if (!actor) return;
    setLoadingProducts(true);
    actor
      .getProducts()
      .then(setProducts)
      .catch(() => toast.error("Failed to load products"))
      .finally(() => setLoadingProducts(false));
  };

  useEffect(() => {
    if (!actor || !isAdmin) return;
    Promise.all([actor.getProducts(), actor.getStoreInfo()])
      .then(([prods, info]) => {
        setProducts(prods);
        setStoreForm(info);
      })
      .catch(() => {});
  }, [actor, isAdmin]);

  const openAddModal = () => {
    setEditingProduct(null);
    setForm(emptyForm());
    setModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      category: product.category,
      priceINR: product.priceINR,
      featured: product.featured,
      imageBlob: product.image,
    });
    setModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const arrayBuffer = ev.target?.result as ArrayBuffer;
      const bytes = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(bytes);
      setForm((prev) => ({ ...prev, imageBlob: blob }));
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSaveProduct = async () => {
    if (!actor) return;
    if (!form.name.trim()) {
      toast.error("Product name is required");
      return;
    }
    if (!form.category) {
      toast.error("Please select a category");
      return;
    }
    setSaving(true);
    try {
      const productData: Product = {
        id: editingProduct ? editingProduct.id : 0n,
        createdAt: editingProduct ? editingProduct.createdAt : 0n,
        name: form.name.trim(),
        description: form.description.trim(),
        category: form.category,
        priceINR: form.priceINR,
        featured: form.featured,
        image: form.imageBlob,
      };
      if (editingProduct) {
        await actor.updateProduct(editingProduct.id, productData);
        toast.success("Product updated successfully");
      } else {
        await actor.createProduct(productData);
        toast.success("Product created successfully");
      }
      setModalOpen(false);
      loadProducts();
    } catch {
      toast.error("Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!actor || deleteId === null) return;
    setDeleting(true);
    try {
      await actor.deleteProduct(deleteId);
      toast.success("Product deleted");
      setDeleteId(null);
      loadProducts();
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setDeleting(false);
    }
  };

  const handleSaveStore = async () => {
    if (!actor) return;
    setSavingStore(true);
    try {
      await actor.updateStoreInfo(storeForm);
      toast.success("Store information updated");
    } catch {
      toast.error("Failed to update store info");
    } finally {
      setSavingStore(false);
    }
  };

  if (!identity) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
        style={{ backgroundColor: CREAM }}
      >
        <div
          className="p-10 max-w-md w-full"
          style={{ border: `1px solid ${GOLD}50`, backgroundColor: "#fff" }}
        >
          <span style={{ color: GOLD }} className="text-4xl block mb-4">
            🔐
          </span>
          <h2
            style={{ color: BURGUNDY, fontFamily: "Cinzel, serif" }}
            className="text-2xl font-semibold mb-3"
          >
            Admin Access
          </h2>
          <p
            style={{
              color: "#5a4a3a",
              fontFamily: "Cormorant Garamond, serif",
            }}
            className="text-base mb-6"
          >
            Please login with Internet Identity to access the management panel.
          </p>
          <Button
            data-ocid="admin.login.button"
            onClick={login}
            disabled={isLoggingIn}
            className="w-full py-3 tracking-widest uppercase text-sm"
            style={{
              backgroundColor: BURGUNDY,
              color: GOLD,
              fontFamily: "Cinzel, serif",
              border: `1px solid ${GOLD}50`,
            }}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              "Login to Admin Panel"
            )}
          </Button>
        </div>
      </div>
    );
  }

  if (isAdmin === null) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: CREAM }}
      >
        <Loader2 className="animate-spin h-8 w-8" style={{ color: GOLD }} />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
        style={{ backgroundColor: CREAM }}
      >
        <div
          className="p-10 max-w-md w-full"
          style={{ border: `1px solid ${GOLD}50`, backgroundColor: "#fff" }}
        >
          <span style={{ color: GOLD }} className="text-4xl block mb-4">
            ⛔
          </span>
          <h2
            style={{ color: BURGUNDY, fontFamily: "Cinzel, serif" }}
            className="text-2xl font-semibold mb-3"
          >
            Access Denied
          </h2>
          <p
            style={{
              color: "#5a4a3a",
              fontFamily: "Cormorant Garamond, serif",
            }}
            className="text-base mb-6"
          >
            Aap is account se admin nahi hain. Logout karke dobara login karein.
          </p>
          <Button
            data-ocid="admin.logout.button"
            onClick={clear}
            className="w-full py-3 tracking-widest uppercase text-sm"
            style={{
              backgroundColor: BURGUNDY,
              color: GOLD,
              fontFamily: "Cinzel, serif",
              border: `1px solid ${GOLD}50`,
            }}
          >
            Logout karein
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: CREAM }} className="min-h-screen">
      <div
        className="py-12 text-center px-4"
        style={{
          background: `linear-gradient(180deg, ${BURGUNDY} 0%, #3A0B1E 100%)`,
        }}
      >
        <h1
          style={{
            color: GOLD,
            fontFamily: "Cinzel, serif",
            letterSpacing: "0.2em",
          }}
          className="text-3xl font-semibold uppercase"
        >
          Management Panel
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <Tabs defaultValue="products" data-ocid="admin.panel">
          <TabsList className="mb-8" style={{ backgroundColor: "#e8ddd0" }}>
            <TabsTrigger
              data-ocid="admin.products.tab"
              value="products"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Products
            </TabsTrigger>
            <TabsTrigger
              data-ocid="admin.store.tab"
              value="store"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Store Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <div className="flex items-center justify-between mb-6">
              <h2
                style={{ color: BURGUNDY, fontFamily: "Cinzel, serif" }}
                className="text-xl font-semibold"
              >
                All Products
              </h2>
              <Button
                data-ocid="admin.add_product.button"
                onClick={openAddModal}
                className="flex items-center gap-2 text-xs tracking-widest uppercase"
                style={{
                  backgroundColor: GOLD,
                  color: BURGUNDY,
                  fontFamily: "Cinzel, serif",
                }}
              >
                <Plus size={14} /> Add Product
              </Button>
            </div>

            {loadingProducts ? (
              <div
                data-ocid="admin.products.loading_state"
                className="flex justify-center py-16"
              >
                <Loader2
                  className="animate-spin h-8 w-8"
                  style={{ color: GOLD }}
                />
              </div>
            ) : products.length === 0 ? (
              <div
                data-ocid="admin.products.empty_state"
                className="text-center py-16"
                style={{
                  border: `1px dashed ${GOLD}50`,
                  backgroundColor: "#fff",
                }}
              >
                <span style={{ color: GOLD }} className="text-4xl block mb-3">
                  ✦
                </span>
                <p style={{ color: BURGUNDY, fontFamily: "Cinzel, serif" }}>
                  No products yet. Add your first product!
                </p>
              </div>
            ) : (
              <div
                className="bg-white overflow-hidden"
                style={{ border: `1px solid ${GOLD}40` }}
              >
                <table
                  className="w-full text-sm"
                  data-ocid="admin.products.table"
                >
                  <thead>
                    <tr style={{ backgroundColor: BURGUNDY }}>
                      {[
                        "Image",
                        "Name",
                        "Category",
                        "Price",
                        "Featured",
                        "Actions",
                      ].map((h, i) => (
                        <th
                          key={h}
                          style={{ color: GOLD, fontFamily: "Cinzel, serif" }}
                          className={`px-4 py-3 text-xs tracking-wider ${
                            i === 0 || i === 1
                              ? "text-left"
                              : i === 2
                                ? "text-left hidden md:table-cell"
                                : i === 3
                                  ? "text-left hidden sm:table-cell"
                                  : i === 4
                                    ? "text-left hidden lg:table-cell"
                                    : "text-right"
                          }`}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, idx) => (
                      <tr
                        key={product.id.toString()}
                        data-ocid={`admin.product.item.${idx + 1}`}
                        style={{ borderBottom: `1px solid ${GOLD}20` }}
                        className="hover:bg-amber-50 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div
                            className="w-12 h-12 rounded overflow-hidden flex items-center justify-center"
                            style={{
                              backgroundColor: "#FAF6F0",
                              border: `1px solid ${GOLD}30`,
                            }}
                          >
                            {product.image ? (
                              <img
                                src={product.image.getDirectURL()}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span style={{ color: GOLD }} className="text-lg">
                                ✦
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            style={{
                              fontFamily: "Cinzel, serif",
                              color: "#1a0a00",
                            }}
                            className="text-xs font-semibold"
                          >
                            {product.name}
                          </span>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span
                            style={{ color: "#5a4a3a" }}
                            className="text-xs"
                          >
                            {product.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span
                            style={{ color: GOLD, fontFamily: "Cinzel, serif" }}
                            className="text-xs font-semibold"
                          >
                            ₹{product.priceINR.toLocaleString("en-IN")}
                          </span>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <span
                            className={`text-xs px-2 py-1 rounded ${product.featured ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-500"}`}
                          >
                            {product.featured ? "Yes" : "No"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              data-ocid={`admin.product.edit_button.${idx + 1}`}
                              onClick={() => openEditModal(product)}
                              className="p-1.5 rounded hover:bg-amber-100 transition-colors"
                              style={{ color: BURGUNDY }}
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              type="button"
                              data-ocid={`admin.product.delete_button.${idx + 1}`}
                              onClick={() => setDeleteId(product.id)}
                              className="p-1.5 rounded hover:bg-red-100 transition-colors"
                              style={{ color: "#c0392b" }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="store">
            <div
              className="max-w-2xl bg-white p-8"
              style={{ border: `1px solid ${GOLD}40` }}
            >
              <h2
                style={{ color: BURGUNDY, fontFamily: "Cinzel, serif" }}
                className="text-xl font-semibold mb-6"
              >
                Store Information
              </h2>
              <div className="space-y-5">
                {(
                  [
                    { key: "name", label: "Store Name", type: "text" },
                    { key: "tagline", label: "Tagline", type: "text" },
                    { key: "address", label: "Address", type: "text" },
                    { key: "phone", label: "Phone", type: "tel" },
                    { key: "whatsapp", label: "WhatsApp Number", type: "text" },
                    { key: "email", label: "Email", type: "email" },
                  ] as const
                ).map((field) => (
                  <div key={field.key}>
                    <Label
                      htmlFor={`store-${field.key}`}
                      style={{ color: BURGUNDY, fontFamily: "Cinzel, serif" }}
                      className="text-xs tracking-widest uppercase mb-2 block"
                    >
                      {field.label}
                    </Label>
                    <Input
                      id={`store-${field.key}`}
                      data-ocid={`admin.store.${field.key}.input`}
                      type={field.type}
                      value={storeForm[field.key]}
                      onChange={(e) =>
                        setStoreForm((prev) => ({
                          ...prev,
                          [field.key]: e.target.value,
                        }))
                      }
                      style={{ borderColor: `${GOLD}60` }}
                    />
                  </div>
                ))}
                <Button
                  data-ocid="admin.store.save_button"
                  onClick={handleSaveStore}
                  disabled={savingStore}
                  className="w-full py-3 tracking-widest uppercase text-sm mt-4"
                  style={{
                    backgroundColor: BURGUNDY,
                    color: GOLD,
                    fontFamily: "Cinzel, serif",
                    border: `1px solid ${GOLD}50`,
                  }}
                >
                  {savingStore ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Saving...
                    </>
                  ) : (
                    "Save Store Info"
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Product Add/Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent
          className="max-w-xl max-h-[90vh] overflow-y-auto"
          data-ocid="admin.product.dialog"
        >
          <DialogHeader>
            <DialogTitle
              style={{ fontFamily: "Cinzel, serif", color: BURGUNDY }}
            >
              {editingProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label
                htmlFor="prod-name"
                className="text-xs tracking-widest uppercase mb-1 block"
                style={{ color: BURGUNDY, fontFamily: "Cinzel, serif" }}
              >
                Product Name *
              </Label>
              <Input
                id="prod-name"
                data-ocid="admin.product.name.input"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="e.g. Royal Kundan Necklace"
              />
            </div>
            <div>
              <Label
                htmlFor="prod-desc"
                className="text-xs tracking-widest uppercase mb-1 block"
                style={{ color: BURGUNDY, fontFamily: "Cinzel, serif" }}
              >
                Description
              </Label>
              <Textarea
                id="prod-desc"
                data-ocid="admin.product.description.textarea"
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="Describe the jewellery piece..."
              />
            </div>
            <div>
              <Label
                className="text-xs tracking-widest uppercase mb-1 block"
                style={{ color: BURGUNDY, fontFamily: "Cinzel, serif" }}
              >
                Category *
              </Label>
              <Select
                value={form.category}
                onValueChange={(val) =>
                  setForm((prev) => ({ ...prev, category: val }))
                }
              >
                <SelectTrigger data-ocid="admin.product.category.select">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label
                htmlFor="prod-price"
                className="text-xs tracking-widest uppercase mb-1 block"
                style={{ color: BURGUNDY, fontFamily: "Cinzel, serif" }}
              >
                Price (₹)
              </Label>
              <Input
                id="prod-price"
                data-ocid="admin.product.price.input"
                type="number"
                min={0}
                value={form.priceINR}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    priceINR: Number(e.target.value),
                  }))
                }
                placeholder="45000"
              />
            </div>
            <div className="flex items-center gap-3">
              <Checkbox
                data-ocid="admin.product.featured.checkbox"
                id="featured"
                checked={form.featured}
                onCheckedChange={(checked) =>
                  setForm((prev) => ({ ...prev, featured: !!checked }))
                }
              />
              <Label
                htmlFor="featured"
                style={{ fontFamily: "Cinzel, serif", color: BURGUNDY }}
                className="text-xs tracking-widest uppercase cursor-pointer"
              >
                Mark as Featured
              </Label>
            </div>
            <div>
              <Label
                className="text-xs tracking-widest uppercase mb-1 block"
                style={{ color: BURGUNDY, fontFamily: "Cinzel, serif" }}
              >
                Product Image
              </Label>
              <input
                data-ocid="admin.product.upload_button"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:border-0 file:text-xs file:tracking-wider file:uppercase cursor-pointer"
                style={{ border: `1px solid ${GOLD}50`, padding: "8px" }}
              />
              {form.imageBlob && (
                <p className="text-xs mt-1" style={{ color: "#5a4a3a" }}>
                  ✓ Image selected
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              data-ocid="admin.product.cancel_button"
              variant="outline"
              onClick={() => setModalOpen(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              data-ocid="admin.product.save_button"
              onClick={handleSaveProduct}
              disabled={saving}
              style={{
                backgroundColor: BURGUNDY,
                color: GOLD,
                fontFamily: "Cinzel, serif",
              }}
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : editingProduct ? (
                "Update Product"
              ) : (
                "Create Product"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={deleteId !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
      >
        <AlertDialogContent data-ocid="admin.product.delete.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle style={{ fontFamily: "Cinzel, serif" }}>
              Delete Product
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="admin.product.delete.cancel_button"
              disabled={deleting}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="admin.product.delete.confirm_button"
              onClick={handleDelete}
              disabled={deleting}
              style={{ backgroundColor: "#c0392b" }}
            >
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
