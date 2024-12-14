import React from "react"
//404 Page
const NotFoundPage = React.lazy(() => import("../pages/not-found-page/not-found-page"))
//Auth Page
const LoginPage = React.lazy(() => import("../pages/auth/login/login-page"))
const RegisterPage = React.lazy(() => import("../pages/auth/register/register-page"))
const ResetPassPage = React.lazy(() => import("../pages/auth/reset-password/reset-password"))
const ForgortPassPage = React.lazy(() => import("../pages/auth/forgot-password/forgot-password"))
//Admin Page
const DashboardAdmin = React.lazy(() => import("../pages/admin/dashboard/dashboard"))
const StaffAdmin = React.lazy(() => import("../pages/admin/staff/staff"))
const CustomerAdmin = React.lazy(() => import("../pages/admin/customer/customer"))
const OrderAdmin = React.lazy(() => import("../pages/admin/order/order"))
const SettingAdmin = React.lazy(() => import("../pages/admin/setting/setting"))
const CategoryAdmin = React.lazy(() => import("../pages/admin/category/category"))
const CreateProduct = React.lazy(() => import("../pages/admin/product/create-product"))
const ProductAdmin = React.lazy(() => import("../pages/admin/product/Product"))
const PostAdmin = React.lazy(() => import("../pages/admin/post/post"))
const ChatAdmin = React.lazy(() => import("../pages/admin/chat/chat"))
//Customer
const HomePage = React.lazy(() => import("../pages/user/home-page/home-page"))
const CollectionPage = React.lazy(() => import("../pages/user/collection-page/collections"))
const CollectionItemPage = React.lazy(() => import("../pages/user/collection-page/collection-item"))
const ProductItemPage = React.lazy(() => import("../pages/user/products/product-item"))
const CartPage = React.lazy(() => import("../pages/user/cart/cart"))
const CheckOutPage = React.lazy(() => import("../pages/user/check-out/check-out"))
const PaymentCallback = React.lazy(() => import("../pages/user/check-out/payment-callback"))
const ContactPage = React.lazy(() => import("../pages/user/contact/contact"))
const NewsPage = React.lazy(() => import("../pages/user/blogs/news"))
const DetailNewPage = React.lazy(() => import("../pages/user/blogs/detail-new"))
const WhistListProduct = React.lazy(() => import("../pages/user/products/products"))
const ProfilePage = React.lazy(() => import("../pages/user/profile/profile"))
const MyCartPage = React.lazy(() => import("../pages/user/cart/my-cart"))
const WhistListPage = React.lazy(() => import("../pages/user/whistlist/whistlist"))
export interface Route {
  path: string
  element: any
  isShowHeader: boolean
  isAdmin: boolean
}

import { withAuthAdmin } from "@/hooks/withAuth"

export const routes: Route[] = [
  //customer
  { path: "/", element: HomePage, isShowHeader: true, isAdmin: false },
  { path: "/collections", element: CollectionPage, isShowHeader: true, isAdmin: false },
  { path: "/collections/:slug", element: CollectionItemPage, isShowHeader: true, isAdmin: false },
  { path: "/products/:slug", element: ProductItemPage, isShowHeader: true, isAdmin: false },
  { path: "/products", element: WhistListProduct, isShowHeader: true, isAdmin: false },
  { path: "/cart", element: CartPage, isShowHeader: true, isAdmin: false },
  { path: "/checkout", element: CheckOutPage, isShowHeader: false, isAdmin: false },
  { path: "/payments/vn-pay-callback", element: PaymentCallback, isShowHeader: false, isAdmin: false },
  { path: "/contact", element: ContactPage, isShowHeader: true, isAdmin: false },
  { path: "/blogs/news", element: NewsPage, isShowHeader: true, isAdmin: false },
  { path: "/blogs/news/:slug", element: DetailNewPage, isShowHeader: true, isAdmin: false },
  { path: "/me/profile", element: ProfilePage, isShowHeader: true, isAdmin: false },
  { path: "/me/cart", element: MyCartPage, isShowHeader: true, isAdmin: false },
  { path: "/me/whistlist", element: WhistListPage, isShowHeader: true, isAdmin: false },
  //admin
  { path: "/admin/dashboard", element: withAuthAdmin(DashboardAdmin), isShowHeader: false, isAdmin: true },
  { path: "/admin/customers", element: withAuthAdmin(CustomerAdmin), isShowHeader: false, isAdmin: true },
  { path: "/admin/staffs", element: withAuthAdmin(StaffAdmin), isShowHeader: false, isAdmin: true },
  { path: "/admin/products", element: withAuthAdmin(ProductAdmin), isShowHeader: false, isAdmin: true },
  { path: "/admin/product/create", element: withAuthAdmin(CreateProduct), isShowHeader: false, isAdmin: true },
  { path: "/admin/orders", element: withAuthAdmin(OrderAdmin), isShowHeader: false, isAdmin: true },
  { path: "/admin/settings", element: withAuthAdmin(SettingAdmin), isShowHeader: false, isAdmin: true },
  { path: "/admin/categories", element: withAuthAdmin(CategoryAdmin), isShowHeader: false, isAdmin: true },
  { path: "/admin/posts", element: withAuthAdmin(PostAdmin), isShowHeader: false, isAdmin: true },
  { path: "/admin/chats", element: withAuthAdmin(ChatAdmin), isShowHeader: false, isAdmin: true },
  //auth
  { path: "/account/login", element: LoginPage, isShowHeader: false, isAdmin: false },
  { path: "/account/register", element: RegisterPage, isShowHeader: false, isAdmin: false },
  { path: "/account/reset-password", element: ResetPassPage, isShowHeader: false, isAdmin: false },
  { path: "/account/forgot-password", element: ForgortPassPage, isShowHeader: false, isAdmin: false },
  // not found page
  {
    path: "*",
    element: NotFoundPage,
    isShowHeader: false,
    isAdmin: false,
  },
]

