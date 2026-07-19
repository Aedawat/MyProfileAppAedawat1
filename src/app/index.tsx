import {
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

// 1. นำข้อมูลสินค้าออกทั้งหมดเรียบร้อยแล้ว (เหลือเป็นอาเรย์ว่างสำหรับรอเชื่อมต่อ API หรือดึงข้อมูลจาก Database)
const products = [];

export default function ProductsScreen() {
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
        contentContainerStyle={products.length === 0 && styles.emptyScrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productInfo}>
                {/* รูปภาพสินค้า */}
                <View style={styles.imageWrapper}>
                  <Image
                    source={{ uri: product.imageUrl }}
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                </View>
                
                {/* รายละเอียดจำนวน/คลังสินค้า */}
                <View style={styles.productDetails}>
                  <Text style={styles.stockText}>Stock: {product.stock} in stock</Text>
                  <Text style={styles.categoryText}>Category: {product.category}</Text>
                  <Text style={styles.locationText}>Location: {product.location}</Text>
                </View>
                
                {/* ปุ่มสถานะด้านขวา */}
                <View style={styles.productActions}>
                  <TouchableOpacity style={styles.statusButton}>
                    <Text style={styles.statusText}>{product.status}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.moreButton}>
                    <Text style={styles.moreIcon}>›</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              {/* ชื่อสินค้าด้านล่างการ์ด */}
              <Text style={styles.productName}>{product.name}</Text>
            </View>
          ))
        ) : (
          /* ส่วนแสดงผลกรณีไม่มีสินค้าในคลัง (Empty State) เพื่อไม่ให้หน้าจอโล่งเกินไป */
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

// 2. ปรับโครงสร้างสีเป็นแบบ ฟ้าอ่อน (Light Blue) และ น้ำเงิน (Navy Blue)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eff6ff', // สีพื้นหลังแอป ฟ้าอ่อนมากๆ (เด้งรูปภาพและข้อความให้เด่น)
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#1e3a8a', // แถบบนสุดสีน้ำเงินเข้มขรึมสุดพรีเมียม
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
    color: '#93c5fd', // ไอคอนสีฟ้าอ่อน
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff', // ตัวหนังสือชื่อแอปสีขาวตัดชัดเจน
  },
  profileButton: {
    width: 30,
    height: 30,
    backgroundColor: '#60a5fa', // ปุ่มโปรไฟล์สีฟ้าสว่าง
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
    backgroundColor: '#1e3a8a', // ใช้สีน้ำเงินต่อเนื่องมาจาก Header
    borderBottomWidth: 1,
    borderBottomColor: '#1d4ed8',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#172554', // แถบค้นหาดีไซน์เข้มขึ้นเล็กน้อย
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
    backgroundColor: '#60a5fa', // ปุ่ม + Add Product ใช้สีฟ้าสดใสตัดสะดุดตา
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
    paddingBottom: 80, // ดันขึ้นเล็กน้อยเพื่อความสมดุลสายตา
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
    backgroundColor: '#ffffff', // การ์ดสินค้าสีขาวสะอาดตาตัดกับพื้นหลังฟ้าอ่อน
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
    backgroundColor: '#dbeafe', // ปุ่มสถานะสีฟ้าอ่อนสดใสแบบพาสเทล
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 10,
  },
  statusText: {
    color: '#1e40af', // อักษรสถานะสีน้ำเงินเข้ม
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
    color: '#1e3a8a', // ชื่อสินค้าเป็นสีน้ำเงินเข้มสว่าง
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#ffffff', // แถบล่างพื้นสีขาวเรียบร้อย
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