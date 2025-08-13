import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

interface Review {
  id: string;
  rating: number;
  comment: string;
  date: string;
  userName: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      rating: 5,
      comment: 'Aplikasi sangat bagus dan mudah digunakan!',
      date: '2025-08-10',
      userName: 'Ahmad Rizki',
    },
    {
      id: '2',
      rating: 4,
      comment: 'Interface yang menarik, tapi bisa lebih cepat.',
      date: '2025-08-08',
      userName: 'Sari Dewi',
    },
  ]);

  const [showAddReview, setShowAddReview] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');

  const addReview = () => {
    if (newRating === 0) {
      Alert.alert('Error', 'Silakan berikan rating terlebih dahulu');
      return;
    }
    if (newComment.trim() === '') {
      Alert.alert('Error', 'Silakan tulis komentar Anda');
      return;
    }
    if (userName.trim() === '') {
      Alert.alert('Error', 'Silakan masukkan nama Anda');
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      rating: newRating,
      comment: newComment.trim(),
      date: new Date().toISOString().split('T')[0],
      userName: userName.trim(),
    };

    setReviews([newReview, ...reviews]);
    setNewRating(0);
    setNewComment('');
    setUserName('');
    setShowAddReview(false);
    Alert.alert('Sukses', 'Review Anda telah ditambahkan!');
  };

  const renderStars = (rating: number, onPress?: (rating: number) => void) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => onPress && onPress(star)}
            disabled={!onPress}
          >
            <Ionicons
              name={star <= rating ? 'star' : 'star-outline'}
              size={24}
              color={star <= rating ? '#FFD700' : '#CCC'}
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <View style={styles.container}>
      <Animatable.View 
        animation="fadeInDown" 
        delay={200} 
        style={styles.header}
      >
        <Text style={styles.title}>Rating & Komentar</Text>
        <View style={styles.summaryContainer}>
          <Text style={styles.averageRating}>
            {averageRating.toFixed(1)}
          </Text>
          {renderStars(Math.round(averageRating))}
          <Text style={styles.reviewCount}>
            ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
          </Text>
        </View>
      </Animatable.View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddReview(true)}
      >
        <Ionicons name="add-circle" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Tambah Review</Text>
      </TouchableOpacity>

      <ScrollView style={styles.reviewsList} showsVerticalScrollIndicator={false}>
        {reviews.map((review, index) => (
          <Animatable.View
            key={review.id}
            animation="fadeInUp"
            delay={index * 100}
            style={styles.reviewCard}
          >
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewUserName}>{review.userName}</Text>
              <Text style={styles.reviewDate}>{review.date}</Text>
            </View>
            {renderStars(review.rating)}
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </Animatable.View>
        ))}
      </ScrollView>

      <Modal
        visible={showAddReview}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddReview(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Tambah Review</Text>
              <TouchableOpacity
                onPress={() => setShowAddReview(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Nama Anda:</Text>
            <TextInput
              style={styles.nameInput}
              placeholder="Masukkan nama Anda"
              value={userName}
              onChangeText={setUserName}
            />

            <Text style={styles.label}>Rating:</Text>
            {renderStars(newRating, setNewRating)}

            <Text style={styles.label}>Komentar:</Text>
            <TextInput
              style={styles.commentInput}
              placeholder="Tulis komentar Anda di sini..."
              value={newComment}
              onChangeText={setNewComment}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowAddReview(false);
                  setNewRating(0);
                  setNewComment('');
                  setUserName('');
                }}
              >
                <Text style={styles.cancelButtonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={addReview}
              >
                <Text style={styles.submitButtonText}>Kirim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 15,
  },
  summaryContainer: {
    alignItems: 'center',
  },
  averageRating: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
  },
  reviewCount: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 5,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  star: {
    marginHorizontal: 2,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B6B',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  reviewsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewUserName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  reviewDate: {
    fontSize: 12,
    color: '#6c757d',
  },
  reviewComment: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  closeButton: {
    padding: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
    marginTop: 15,
  },
  nameInput: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    height: 100,
    backgroundColor: '#f8f9fa',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: '#FF6B6B',
    marginLeft: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});