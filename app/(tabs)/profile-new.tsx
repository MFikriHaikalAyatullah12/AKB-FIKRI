import { Ionicons } from '@expo/vector-icons';
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

const userProfile = {
  name: 'M. FIKRI HAIKAL AYATULLAH',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  rating: 4.8,
  totalReviews: 234,
  joinDate: 'March 2023',
  location: 'Makassar, Indonesia'
};

const reviews = [
  {
    id: '1',
    userName: 'Sarah Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b739?w=50&h=50&fit=crop&crop=face',
    rating: 5,
    date: '2 days ago',
    comment: 'Amazing quality products! Fast shipping and excellent customer service. Highly recommended!',
    product: 'Summer Dress',
    helpful: 12
  },
  {
    id: '2',
    userName: 'Mike Chen',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
    rating: 4,
    date: '1 week ago',
    comment: 'Good value for money. The fabric is nice and fits well. Will order again.',
    product: 'Casual Shirt',
    helpful: 8
  },
  {
    id: '3',
    userName: 'Emma Wilson',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Perfect fit and style! Love the attention to detail. Definitely coming back for more.',
    product: 'High-Waisted Trousers',
    helpful: 15
  },
  {
    id: '4',
    userName: 'David Brown',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face',
    rating: 4,
    date: '3 weeks ago',
    comment: 'Great collection and fast delivery. The quality exceeded my expectations.',
    product: 'Winter Jacket',
    helpful: 6
  }
];

const stats = [
  { label: 'Orders', value: '127' },
  { label: 'Reviews', value: '234' },
  { label: 'Photos', value: '89' },
  { label: 'Followers', value: '1.2K' }
];

export default function ProfilePage() {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={16} color="#FFD700" />);
    }

    if (hasHalfStar) {
      stars.push(<Ionicons key="half" name="star-half" size={16} color="#FFD700" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={16} color="#FFD700" />);
    }

    return stars;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor="#FF6B6B" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile & Reviews</Text>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileCard}>
          <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{userProfile.name}</Text>
            <Text style={styles.userLocation}>{userProfile.location}</Text>
            <Text style={styles.joinDate}>Member since {userProfile.joinDate}</Text>
            
            <View style={styles.ratingContainer}>
              <View style={styles.starsContainer}>
                {renderStars(userProfile.rating)}
              </View>
              <Text style={styles.ratingText}>{userProfile.rating}</Text>
              <Text style={styles.reviewCount}>({userProfile.totalReviews} reviews)</Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Rating Breakdown */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rating & Reviews</Text>
        <View style={styles.ratingBreakdown}>
          <View style={styles.overallRating}>
            <Text style={styles.overallRatingNumber}>{userProfile.rating}</Text>
            <View style={styles.overallStars}>
              {renderStars(userProfile.rating)}
            </View>
            <Text style={styles.totalReviewsText}>{userProfile.totalReviews} reviews</Text>
          </View>
          
          <View style={styles.ratingBars}>
            {[5, 4, 3, 2, 1].map((star) => (
              <View key={star} style={styles.ratingBar}>
                <Text style={styles.starNumber}>{star}</Text>
                <Ionicons name="star" size={12} color="#FFD700" />
                <View style={styles.barContainer}>
                  <View style={[styles.barFill, { width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 8 : star === 2 ? 2 : 0}%` }]} />
                </View>
                <Text style={styles.barPercentage}>{star === 5 ? '70%' : star === 4 ? '20%' : star === 3 ? '8%' : star === 2 ? '2%' : '0%'}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Reviews List */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Reviews</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {reviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Image source={{ uri: review.userAvatar }} style={styles.reviewerAvatar} />
              <View style={styles.reviewerInfo}>
                <Text style={styles.reviewerName}>{review.userName}</Text>
                <View style={styles.reviewRating}>
                  {renderStars(review.rating)}
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
              </View>
            </View>
            
            <Text style={styles.reviewProduct}>Purchased: {review.product}</Text>
            <Text style={styles.reviewComment}>{review.comment}</Text>
            
            <View style={styles.reviewFooter}>
              <TouchableOpacity style={styles.helpfulButton}>
                <Ionicons name="thumbs-up-outline" size={16} color="#666" />
                <Text style={styles.helpfulText}>Helpful ({review.helpful})</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="flag-outline" size={16} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#FF6B6B',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  editButton: {
    padding: 5,
  },
  profileSection: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginTop: -30,
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  joinDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 5,
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  section: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAllText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: '600',
  },
  ratingBreakdown: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  overallRating: {
    alignItems: 'center',
    marginRight: 30,
  },
  overallRatingNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  overallStars: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  totalReviewsText: {
    fontSize: 12,
    color: '#666',
  },
  ratingBars: {
    flex: 1,
  },
  ratingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starNumber: {
    fontSize: 12,
    color: '#666',
    width: 15,
  },
  barContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    marginHorizontal: 8,
  },
  barFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 3,
  },
  barPercentage: {
    fontSize: 10,
    color: '#666',
    width: 25,
    textAlign: 'right',
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8,
  },
  reviewProduct: {
    fontSize: 12,
    color: '#FF6B6B',
    fontWeight: '600',
    marginBottom: 8,
  },
  reviewComment: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 12,
  },
  reviewFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpfulText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
});
