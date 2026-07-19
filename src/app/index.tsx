import { useEffect, useState } from 'react'; // ปรับแก้ไขการอิมพอร์ตให้ถูกต้อง
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// กำหนด URL ของไฟล์ JSON บน GitHub ของคุณ (แก้ไขเป็นลิงก์ Raw จริงเรียบร้อยแล้ว)
const GITHUB_DATA_URL = 'https://raw.githubusercontent.com/Aedawat/MyProfileAppAedawat1/refs/heads/main/product.json'; 

export default function ProductsScreen() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(GITHUB_DATA_URL);
      const data = await response.json();
      
      // ตรวจสอบโครงสร้างข้อมูลเพื่อป้องกันกรณีที่ไม่ใช่ Array แอร์พอร์ตจะไม่แครช
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ส่วนแถบสถานะด้านบนสุดปรับเป็นสีน้ำเงินตัดกับตัวแอป */}
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />

      {/* --- ส่วนหัวแอป (Product Header) --- */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Products</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* --- ส่วนค้นหาและฟิลเตอร์ --- */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor="#93c5fd"
            editable={false}
          />
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Product</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filter ▼</Text>
        </TouchableOpacity>
      </View>

      {/* --- ส่วนแสดงรายการสินค้า (Products List) --- */}
      <ScrollView 
        style={styles.productsList} 
        contentContainerStyle={[
          styles.scrollContent,
          (isLoading || products.length === 0) ? styles.emptyScrollContainer : null // แก้ไขบั๊กส่วนนี้ให้อยู่ในรูปแบบ Array Style ที่ปลอดภัยต่อระบบเว็บ
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* แสดงตัวหมุนรอโหลด ถ้ายังดึงข้อมูลจาก GitHub ไม่เสร็จ */}
        {isLoading ? (
          <ActivityIndicator size="large" color="#1e3a8a" style={{ marginTop: 40 }} />
        ) : products.length > 0 ? (
          products.map((product, index) => (
            <View key={product.id || product._id || index} style={styles.productCard}>
              <View style={styles.productInfo}>
                {/* รูปภาพสินค้า */}
                <View style={styles.imageWrapper}>
                  <Image
                    source={{ uri: product.imageUrl || product.image || 'https://via.placeholder.com/150' }}
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                </View>
                
                {/* รายละเอียดจำนวน/คลังสินค้า */}
                <View style={styles.productDetails}>
                  <Text style={styles.stockText}>Stock: {product.stock ?? 0} in stock</Text>
                  <Text style={styles.categoryText}>Category: {product.category || 'General'}</Text>
                  <Text style={styles.locationText}>Location: {product.location || 'N/A'}</Text>
                </View>
                
                {/* ปุ่มสถานะด้านขวา */}
                <View style={styles.productActions}>
                  <TouchableOpacity style={styles.statusButton}>
                    <Text style={styles.statusText}>{product.status || 'Active'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.moreButton}>
                    <Text style={styles.moreIcon}>›</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              {/* ชื่อสินค้าด้านล่างการ์ด */}
              <Text style={styles.productName}>{product.name || 'Unnamed Product'}</Text>
            </View>
          ))
        ) : (
          /* ส่วนแสดงผลกรณีไม่มีสินค้าในคลัง (Empty State) */
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📦</Text>
            <Text style={styles.emptyText}>No products found</Text>
            <Text style={styles.emptySubText}>There are no items available right now.</Text>
          </View>
        )}
      </ScrollView>

      {/* --- แถบเมนูด้านล่าง (Bottom Navigation) --- */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>+</Text>
          <Text style={styles.navText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👟</Text>
          <Text style={[styles.navText, { color: '#1e3a8a', fontWeight: 'bold' }]}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📂</Text>
          <Text style={styles.navText}>Categories</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eff6ff', 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#1e3a8a', 
    borderBottomWidth: 1,
    borderBottomColor: '#1d4ed8',
  },
  menuButton: {
    width: 38,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 18,
    color: '#93c5fd', 
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff', 
  },
  profileButton: {
    width: 30,
    height: 30,
    backgroundColor: '#60a5fa', 
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 16,
    color: '#ffffff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#1e3a8a', 
    borderBottomWidth: 1,
    borderBottomColor: '#1d4ed8',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#172554', 
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchIcon: {
    fontSize: 16,
    color: '#60a5fa',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontSize: 14,
    color: '#ffffff',
  },
  addButton: {
    backgroundColor: '#60a5fa', 
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  filterButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  filterText: {
    color: '#93c5fd',
    fontSize: 14,
    fontWeight: '600',
  },
  productsList: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  emptyScrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80, 
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: 6,
  },
  emptySubText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  productCard: {
    backgroundColor: '#ffffff', 
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#1e3a8a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageWrapper: {
    width: 75,
    height: 75,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productDetails: {
    flex: 1,
    marginLeft: 15,
  },
  stockText: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 2,
  },
  categoryText: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 2,
  },
  locationText: {
    fontSize: 14,
    color: '#475569',
  },
  productActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusButton: {
    backgroundColor: '#dbeafe', 
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 10,
  },
  statusText: {
    color: '#1e40af', 
    fontSize: 12,
    fontWeight: '700',
  },
  moreButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreIcon: {
    fontSize: 20,
    color: '#1e3a8a',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e3a8a', 
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#ffffff', 
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: '#64748b',
  },
});