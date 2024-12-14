import {
  IProductEarphoneAttributesDTO,
  IProductHeadphoneAttributesDTO,
  IProductLaptopAttributesDTO,
  IProductMonitorAttributesDTO,
  IProductPhoneAttributesDTO,
  IProductSmartwatchAttributesDTO,
  IProductSpeakerAttributesDTO,
  IProductTabletAttributesDTO,
} from "@/lib/types"

const DataCategoryId = {
  laptop: 42,
  phone: 12,
  smartwatch: 11,
  headphone: 1,
  earphone: 13,
  tablet: 44,
  speaker: 32,
  monitor: 43,
}

export default DataCategoryId

export const initialDataDefaultAttribute = (name: string): any => {
  switch (name) {
    case "laptop":
      const mockLaptopData: IProductLaptopAttributesDTO = {
        supplierId: 101,
        cpu: "Intel Core i7",
        cpuGen: "11th Gen",
        gpu: "NVIDIA GeForce RTX 3060",
        ramName: "DDR4",
        ramCapacity: "16GB",
        storage: "512GB SSD",
        os: "Windows 11",
        displayResolution: "1920x1080",
        displaySize: "15.6 inches",
        displayType: "IPS",
        ports: "USB-C, HDMI, 3x USB-A, Ethernet",
        caseMaterial: "Aluminum",
        wifiModel: "Wi-Fi 6",
        camera: "720p HD",
        battery: "56Wh",
        description: "High-performance laptop suitable for gaming and professional use.",
        brand: "Dell",
        model: "XPS 15",
        releaseDate: new Date("2023-05-15"),
      }
      return mockLaptopData
      break
    case "phone":
      const mockPhoneData: IProductPhoneAttributesDTO = {
        brand: "Samsung",
        model: "Galaxy S23 Ultra",
        description: "A flagship smartphone with a powerful camera and cutting-edge features.",
        releaseDate: new Date("2023-02-20"),
        os: "Android",
        osVersion: "13",
        cpu: "Snapdragon 8 Gen 2",
        gpu: "Adreno 740",
        ram: "12GB",
        storageCapacity: "256GB",
        expandableStorage: false,
        batteryCapacity: "5000mAh",
        fastCharging: true,
        wirelessCharging: true,
        chargingPort: "USB-C",
        chargingCapacity: "45W",
        displayType: "Dynamic AMOLED 2X",
        displaySize: "6.8 inches",
        resolution: "3088 x 1440",
        refreshRate: "120Hz",
        screenProtection: "Corning Gorilla Glass Victus 2",
        rearCameraResolution: "200MP + 12MP + 10MP + 10MP",
        rearCameraFeatures: "Night mode, Super Resolution Zoom",
        frontCameraResolution: "12MP",
        frontCameraFeatures: "Auto-HDR, 4K video recording",
        videoRecording: "8K@30fps, 4K@60fps",
        simType: "Dual SIM (Nano-SIM, eSIM)",
        networkSupport: "5G, 4G LTE",
        wifi: "Wi-Fi 6E",
        bluetooth: "5.3",
        gps: true,
        nfc: true,
        infrared: false,
        fingerprintSensor: "Under-display (ultrasonic)",
        accelerometer: true,
        gyroscope: true,
        proximitySensor: true,
        ambientLightSensor: true,
        barometer: true,
        dimensions: "163.4 x 78.1 x 8.9 mm",
        weight: "234 g",
        bodyMaterial: "Armor Aluminum frame, glass back",
        waterResistance: "IP68",
        preInstalledApps: "Google suite, Samsung apps",
        customUI: "One UI 5.1",
        updateSupport: "4 years of OS updates, 5 years of security patches",
        audioJack: false,
        stereoSpeakers: true,
        colorsAvailable: "Phantom Black, Green, Cream, Lavender",
        accessoriesIncluded: "USB-C cable, SIM ejector tool",
        supplierId: 102,
      }
      return mockPhoneData
      break
    case "smartwatch":
      const mockSmartwatchData: IProductSmartwatchAttributesDTO = {
        brand: "Apple",
        model: "Apple Watch Series 9",
        cpu: "S9 SiP",
        ram: "1GB",
        storageCapacity: "32GB",
        batteryCapacity: "308mAh",
        chargingType: "Magnetic wireless charging",
        displayType: "Retina LTPO OLED",
        screenSize: "1.9 inches",
        resolution: "484 x 396",
        refreshRate: "60Hz",
        screenProtection: "Ion-X strengthened glass",
        strapMaterial: "Fluoroelastomer",
        caseMaterial: "Aluminum",
        waterResistance: "WR50 (up to 50m)",
        dimensions: "45 x 38 x 10.7 mm",
        weight: "51.5 g",
        bluetoothVersion: "5.3",
        wifi: "802.11 b/g/n",
        gps: true,
        nfc: true,
        simSupport: false,
        heartRateSensor: true,
        accelerometer: true,
        gyroscope: true,
        barometer: true,
        proximitySensor: true,
        spo2Sensor: true,
        os: "watchOS",
        compatibleWith: "iOS",
        preInstalledApps: "Activity, ECG, Sleep Tracking",
        voiceAssistant: true,
        fitnessTracking: true,
        notifications: true,
        audioJack: false,
        speaker: true,
        microphone: true,
        colorsAvailable: "Midnight, Starlight, Red",
        supplierId: 103,
      }
      return mockSmartwatchData
      break
    case "headphone":
      const mockHeadphoneData: IProductHeadphoneAttributesDTO = {
        brand: "Bose",
        model: "QuietComfort 45",
        type: "Over-ear",
        connectivity: "Bluetooth 5.1, 3.5mm wired",
        driverSize: "40mm",
        frequencyResponse: "20Hz - 20kHz",
        impedance: "32Ω",
        sensitivity: "108dB",
        batteryLife: "24 hours",
        chargingTime: "2 hours",
        noiseCancellation: true,
        microphone: true,
        weight: "240g",
        dimensions: "18 x 15 x 7 cm",
        colorsAvailable: "Black, Silver",
        supplierId: 101,
      }
      return mockHeadphoneData
      break
    case "earphone":
      const mockEarphoneData: IProductEarphoneAttributesDTO = {
        brand: "Sony",
        model: "WF-1000XM4",
        type: "In-ear",
        connectivity: "Bluetooth 5.2",
        driverSize: "6mm",
        frequencyResponse: "20Hz - 20kHz",
        impedance: "16Ω",
        sensitivity: "105dB",
        batteryLife: "8 hours",
        chargingTime: "1.5 hours",
        noiseCancellation: true,
        microphone: true,
        weight: "7.3g",
        dimensions: "2.4 x 2.1 x 2.1 cm",
        colorsAvailable: "Black, Silver",
      }
      return mockEarphoneData
      return
      break
    case "tablet":
      const mockTabletData: IProductTabletAttributesDTO = {
        brand: "Apple",
        model: "iPad Pro 11-inch",
        cpu: "Apple M2",
        ram: "8GB",
        storageCapacity: "256GB",
        batteryCapacity: "7538mAh",
        chargingType: "USB-C",
        displayType: "Liquid Retina",
        screenSize: "11 inches",
        resolution: "2388 x 1668 pixels",
        refreshRate: "120Hz",
        screenProtection: "Scratch-resistant glass",
        dimensions: "247.6 x 178.5 x 5.9 mm",
        weight: "466g",
        bluetoothVersion: "Bluetooth 5.3",
        wifi: "Wi-Fi 6",
        gps: true,
        nfc: false,
        simSupport: true,
        os: "iPadOS 17",
        compatibleWith: "Apple Pencil 2, Magic Keyboard",
        preInstalledApps: "Safari, iMovie, GarageBand",
        voiceAssistant: true,
        colorsAvailable: "Space Gray, Silver",
        supplierId: 123,
      }
      return mockTabletData
      break
    case "speaker":
      const mockSpeakerData: IProductSpeakerAttributesDTO = {
        brand: "JBL",
        model: "Charge 5",
        type: "Portable Bluetooth Speaker",
        connectivity: "Bluetooth 5.1, AUX",
        driverSize: "52mm x 90mm",
        frequencyResponse: "65Hz - 20kHz",
        impedance: "4Ω",
        sensitivity: "80dB",
        batteryLife: "20 hours",
        chargingTime: "4 hours",
        noiseCancellation: false,
        microphone: true,
        weight: "960g",
        dimensions: "223 x 96.5 x 94 mm",
        colorsAvailable: "Black, Red, Blue, Green",
        supplierId: 105,
        powerOutput: "30W RMS",
      }
      return mockSpeakerData
      break
    case "monitor":
      const mockMonitorData: IProductMonitorAttributesDTO = {
        brand: "LG",
        model: "UltraGear 27GN950",
        description: "A high-performance gaming monitor with 4K resolution and ultra-low response time.",
        releaseDate: new Date("2023-03-15"),
        displayType: "IPS",
        displaySize: "27 inches",
        resolution: "3840x2160",
        refreshRate: "144Hz",
        aspectRatio: "16:9",
        brightness: "400 nits",
        contrastRatio: "1000:1",
        responseTime: "1ms",
        ports: "HDMI, DisplayPort, USB-C",
        colorGamut: "DCI-P3 98%",
        viewingAngle: "178°",
        weight: "6.2 kg",
        dimensions: "615.1 x 574.8 x 292.2 mm",
        powerConsumption: "50W",
        warranty: "3 years",
        supplierId: 101,
      }
      return mockMonitorData
      break
    default:
      return {}
  }
}

export const getDTOAttribute = (name: string): string => {
  return `${name.toLocaleLowerCase()}AttributesCreationDTO`
}

