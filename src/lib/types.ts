export interface IUser {
  id: number
  firstName?: string
  lastName?: string
  middleName?: string
  aliasName?: string
  password: string
  englishFirstName?: string
  englishLastName?: string
  avatarUrl?: string
  dob?: Date
  internalId: string
  email?: string
  phoneNumber?: string
  active?: boolean
  readOnly?: boolean
  createdAt: Date
  updatedAt: Date
  createdBy?: bigint
  updatedBy?: bigint
  rawToken?: string
  operationalRole?: string
  gender: number
}

export interface ICategory {
  id: number
  name: string
  imageUrl: string
  slug: string
  description: string
}

export enum EProductStatus {
  DRAFT = "draft",
  PUBLISH = "publish",
  DELETED = "deleted",
}

export interface IProductEarphoneAttributesDTO {
  brand?: string
  model?: string
  type?: string
  connectivity?: string
  driverSize?: string
  frequencyResponse?: string
  impedance?: string
  sensitivity?: string
  batteryLife?: string
  chargingTime?: string
  noiseCancellation?: boolean
  microphone?: boolean
  weight?: string
  dimensions?: string
  colorsAvailable?: string
}

export interface IProductHeadphoneAttributesDTO {
  brand?: string
  model?: string
  type?: string
  connectivity?: string
  driverSize?: string
  frequencyResponse?: string
  impedance?: string
  sensitivity?: string
  batteryLife?: string
  chargingTime?: string
  noiseCancellation?: boolean
  microphone?: boolean
  weight?: string
  dimensions?: string
  colorsAvailable?: string
  supplierId?: number
}
export interface IProductLaptopAttributesDTO {
  id?: number
  supplierId?: number
  cpu?: string
  cpuGen?: string
  gpu?: string
  ramName?: string
  ramCapacity?: string
  storage?: string
  os?: string
  displayResolution?: string
  displaySize?: string
  displayType?: string
  ports?: string
  caseMaterial?: string
  wifiModel?: string
  camera?: string
  battery?: string
  description?: string
  brand?: string
  model?: string
  categoryId?: string
  releaseDate?: Date
}

export interface IProductMonitorAttributesDTO {
  id?: number // Long -> number
  brand?: string
  model?: string
  description?: string
  releaseDate?: Date // Date giữ nguyên
  displayType?: string
  displaySize?: string
  resolution?: string
  refreshRate?: string
  aspectRatio?: string
  brightness?: string
  contrastRatio?: string
  responseTime?: string
  ports?: string
  colorGamut?: string
  viewingAngle?: string
  weight?: string
  dimensions?: string
  powerConsumption?: string
  warranty?: string
  supplierId?: number // Long -> number
}

export interface IProductPhoneAttributesDTO {
  id?: number
  brand?: string
  model?: string
  description?: string
  releaseDate?: Date
  os?: string
  osVersion?: string
  cpu?: string
  gpu?: string
  ram?: string
  storageCapacity?: string
  expandableStorage?: boolean
  batteryCapacity?: string
  fastCharging?: boolean
  wirelessCharging?: boolean
  chargingPort?: string
  chargingCapacity?: string
  displayType?: string
  displaySize?: string
  resolution?: string
  refreshRate?: string
  screenProtection?: string
  rearCameraResolution?: string
  rearCameraFeatures?: string
  frontCameraResolution?: string
  frontCameraFeatures?: string
  videoRecording?: string
  simType?: string
  networkSupport?: string
  wifi?: string
  bluetooth?: string
  gps?: boolean
  nfc?: boolean
  infrared?: boolean
  fingerprintSensor?: string
  accelerometer?: boolean
  gyroscope?: boolean
  proximitySensor?: boolean
  ambientLightSensor?: boolean
  barometer?: boolean
  dimensions?: string
  weight?: string
  bodyMaterial?: string
  waterResistance?: string
  preInstalledApps?: string
  customUI?: string
  updateSupport?: string
  audioJack?: boolean
  stereoSpeakers?: boolean
  colorsAvailable?: string
  accessoriesIncluded?: string
  supplierId?: number
}

export interface IProductSmartwatchAttributesDTO {
  brand?: string
  model?: string
  cpu?: string
  ram?: string
  storageCapacity?: string
  batteryCapacity?: string
  chargingType?: string
  displayType?: string
  screenSize?: string
  resolution?: string
  refreshRate?: string
  screenProtection?: string
  strapMaterial?: string
  caseMaterial?: string
  waterResistance?: string
  dimensions?: string
  weight?: string
  bluetoothVersion?: string
  wifi?: string
  gps?: boolean
  nfc?: boolean
  simSupport?: boolean
  heartRateSensor?: boolean
  accelerometer?: boolean
  gyroscope?: boolean
  barometer?: boolean
  proximitySensor?: boolean
  spo2Sensor?: boolean
  os?: string
  compatibleWith?: string
  preInstalledApps?: string
  voiceAssistant?: boolean
  fitnessTracking?: boolean
  notifications?: boolean
  audioJack?: boolean
  speaker?: boolean
  microphone?: boolean
  colorsAvailable?: string
  supplierId?: number
}

export interface IProductSpeakerAttributesDTO {
  brand?: string
  model?: string
  type?: string
  connectivity?: string
  driverSize?: string
  frequencyResponse?: string
  impedance?: string
  sensitivity?: string
  batteryLife?: string
  chargingTime?: string
  noiseCancellation?: boolean
  microphone?: boolean
  weight?: string
  dimensions?: string
  colorsAvailable?: string
  supplierId?: number
  powerOutput?: string
}

export interface IProductTabletAttributesDTO {
  brand?: string
  model?: string
  cpu?: string
  ram?: string
  storageCapacity?: string
  batteryCapacity?: string
  chargingType?: string
  displayType?: string
  screenSize?: string
  resolution?: string
  refreshRate?: string
  screenProtection?: string
  dimensions?: string
  weight?: string
  bluetoothVersion?: string
  wifi?: string
  gps?: boolean
  nfc?: boolean
  simSupport?: boolean
  os?: string
  compatibleWith?: string
  preInstalledApps?: string
  voiceAssistant?: boolean
  colorsAvailable?: string
  supplierId?: number
}

export interface IInventoryDTO {
  stock :number
  location: string
}
export interface IProduct {
  id: number
  name: string
  categoryId?: number
  price: number
  imageUrl: string
  status: EProductStatus
  attrs: Object
  wishlisted?: boolean
  inventoryDTO?: IInventoryDTO;
  categoryDTO?: ICategory
  productEarphoneAttributesDTO?: IProductEarphoneAttributesDTO
  productHeadphoneAttributesDTO?: IProductHeadphoneAttributesDTO
  productLaptopAttributesDTO?: IProductLaptopAttributesDTO
  productMonitorAttributesDTO?: IProductMonitorAttributesDTO
  productPhoneAttributesDTO?: IProductPhoneAttributesDTO
  productSmartwatchAttributesDTO?: IProductSmartwatchAttributesDTO
  productSpeakerAttributesDTO?: IProductSpeakerAttributesDTO
  productTabletAttributesDTO?: IProductTabletAttributesDTO
}

export interface IProductItemCart {
  id: number
  name: string
  categoryId: number
  price: number
  imageUrl: string
  status: string
}

export interface ICart {
  id: number
  product: IProductItemCart
  quantity: number
}

export interface ICartQuantityHandler {
  initialQuantity: number
  productId: string | number
  getCart: () => void
  className?: string
}

export interface IChat {
  id: number
  content: string
  customer?: IUser
  user?: IUser
}

export interface IOrder {
  id: number;
  customerId: number;
  customerName?: string; 
  orderDate: Date;
  status: string;
  totalAmount: number;
  orderItems: IOrderItem[];
}

export interface IOrderItem {
  id: number;
  product: IProduct;
  quantity: number;
  price: number;
  total: number;
}