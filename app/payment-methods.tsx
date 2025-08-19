import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { COLORS, SHADOWS, SIZES } from '../constants/theme';

interface PaymentCard {
  id: string;
  type: 'visa' | 'mastercard' | 'amex';
  number: string;
  name: string;
  expiry: string;
  isDefault: boolean;
}

export default function PaymentMethodsPage() {
  const [cards, setCards] = useState<PaymentCard[]>([
    {
      id: '1',
      type: 'visa',
      number: '**** **** **** 1234',
      name: 'John Doe',
      expiry: '12/25',
      isDefault: true,
    },
    {
      id: '2',
      type: 'mastercard',
      number: '**** **** **** 5678',
      name: 'John Doe',
      expiry: '09/26',
      isDefault: false,
    },
  ]);

  const [showAddCard, setShowAddCard] = useState(false);
  const [editingCard, setEditingCard] = useState<PaymentCard | null>(null);
  const [newCard, setNewCard] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return 'card';
      case 'mastercard':
        return 'card';
      case 'amex':
        return 'card';
      default:
        return 'card';
    }
  };

  const getCardColor = (type: string) => {
    switch (type) {
      case 'visa':
        return '#1A1F71';
      case 'mastercard':
        return '#EB001B';
      case 'amex':
        return '#006FCF';
      default:
        return COLORS.primary;
    }
  };

  const formatCardNumber = (number: string) => {
    const cleaned = number.replace(/\s/g, '');
    const formatted = cleaned.replace(/(.{4})/g, '$1 ');
    return formatted.trim().substring(0, 19);
  };

  const formatExpiry = (expiry: string) => {
    const cleaned = expiry.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const handleSetDefault = (cardId: string) => {
    setCards(prev => prev.map(card => ({
      ...card,
      isDefault: card.id === cardId
    })));
    Alert.alert('Success', 'Default payment method updated');
  };

  const handleDeleteCard = (cardId: string) => {
    Alert.alert(
      'Delete Card',
      'Are you sure you want to remove this payment method?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setCards(prev => prev.filter(card => card.id !== cardId));
            Alert.alert('Success', 'Payment method removed');
          }
        }
      ]
    );
  };

  const handleAddCard = () => {
    if (!newCard.number || !newCard.name || !newCard.expiry || !newCard.cvv) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const cardType = newCard.number.startsWith('4') ? 'visa' : 
                    newCard.number.startsWith('5') ? 'mastercard' : 'amex';

    const card: PaymentCard = {
      id: Date.now().toString(),
      type: cardType,
      number: '**** **** **** ' + newCard.number.slice(-4),
      name: newCard.name,
      expiry: newCard.expiry,
      isDefault: cards.length === 0,
    };

    setCards(prev => [...prev, card]);
    setNewCard({ number: '', name: '', expiry: '', cvv: '' });
    setShowAddCard(false);
    Alert.alert('Success', 'Payment method added successfully');
  };

  const renderCard = (card: PaymentCard) => (
    <View key={card.id} style={[styles.cardContainer, { backgroundColor: getCardColor(card.type) }]}>
      <View style={styles.cardHeader}>
        <View style={styles.cardInfo}>
          <Ionicons name={getCardIcon(card.type) as any} size={32} color="white" />
          <Text style={styles.cardType}>{card.type.toUpperCase()}</Text>
        </View>
        {card.isDefault && (
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultText}>Default</Text>
          </View>
        )}
      </View>

      <Text style={styles.cardNumber}>{card.number}</Text>
      
      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.cardLabel}>CARDHOLDER NAME</Text>
          <Text style={styles.cardName}>{card.name}</Text>
        </View>
        <View>
          <Text style={styles.cardLabel}>EXPIRES</Text>
          <Text style={styles.cardExpiry}>{card.expiry}</Text>
        </View>
      </View>

      <View style={styles.cardActions}>
        {!card.isDefault && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleSetDefault(card.id)}
          >
            <Text style={styles.actionButtonText}>Set as Default</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteCard(card.id)}
        >
          <Text style={styles.deleteButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowAddCard(true)}
        >
          <Ionicons name="add" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {cards.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="card-outline" size={80} color={COLORS.textLight} />
            <Text style={styles.emptyTitle}>No Payment Methods</Text>
            <Text style={styles.emptyMessage}>
              Add a payment method to make purchases easier
            </Text>
            <TouchableOpacity 
              style={styles.addCardButton}
              onPress={() => setShowAddCard(true)}
            >
              <Ionicons name="add" size={20} color="white" />
              <Text style={styles.addCardButtonText}>Add Payment Method</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.cardsContainer}>
            {cards.map(renderCard)}
            
            <TouchableOpacity 
              style={styles.addMoreButton}
              onPress={() => setShowAddCard(true)}
            >
              <Ionicons name="add-circle-outline" size={24} color={COLORS.primary} />
              <Text style={styles.addMoreText}>Add New Payment Method</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Add Card Modal */}
      <Modal
        visible={showAddCard}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowAddCard(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add Payment Method</Text>
            <TouchableOpacity onPress={handleAddCard}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Card Number</Text>
              <TextInput
                style={styles.input}
                placeholder="1234 5678 9012 3456"
                value={formatCardNumber(newCard.number)}
                onChangeText={(text) => setNewCard(prev => ({ 
                  ...prev, 
                  number: text.replace(/\s/g, '') 
                }))}
                keyboardType="numeric"
                maxLength={19}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Cardholder Name</Text>
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                value={newCard.name}
                onChangeText={(text) => setNewCard(prev => ({ ...prev, name: text }))}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: SIZES.md }]}>
                <Text style={styles.inputLabel}>Expiry Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="MM/YY"
                  value={formatExpiry(newCard.expiry)}
                  onChangeText={(text) => setNewCard(prev => ({ 
                    ...prev, 
                    expiry: text.replace(/\D/g, '') 
                  }))}
                  keyboardType="numeric"
                  maxLength={5}
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.inputLabel}>CVV</Text>
                <TextInput
                  style={styles.input}
                  placeholder="123"
                  value={newCard.cvv}
                  onChangeText={(text) => setNewCard(prev => ({ ...prev, cvv: text }))}
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.securityInfo}>
              <Ionicons name="shield-checkmark" size={20} color={COLORS.success} />
              <Text style={styles.securityText}>
                Your payment information is encrypted and secure
              </Text>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.lg,
    paddingTop: SIZES.xl,
    paddingBottom: SIZES.lg,
    backgroundColor: COLORS.background,
    ...SHADOWS.small,
  },
  backButton: {
    padding: SIZES.sm,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.backgroundLight,
  },
  headerTitle: {
    fontSize: SIZES.textXl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  addButton: {
    padding: SIZES.sm,
    borderRadius: SIZES.radiusFull,
    backgroundColor: COLORS.backgroundLight,
  },
  content: {
    flex: 1,
    padding: SIZES.lg,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.xxl * 2,
  },
  emptyTitle: {
    fontSize: SIZES.text2xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: SIZES.xl,
    marginBottom: SIZES.md,
  },
  emptyMessage: {
    fontSize: SIZES.textBase,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SIZES.xxl,
    paddingHorizontal: SIZES.xl,
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.xl,
    paddingVertical: SIZES.lg,
    borderRadius: SIZES.radiusFull,
    ...SHADOWS.medium,
  },
  addCardButtonText: {
    color: 'white',
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
    marginLeft: SIZES.sm,
  },
  cardsContainer: {
    gap: SIZES.lg,
  },
  cardContainer: {
    padding: SIZES.xl,
    borderRadius: SIZES.radiusLg,
    ...SHADOWS.medium,
    minHeight: 200,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.sm,
  },
  cardType: {
    color: 'white',
    fontSize: SIZES.textSm,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  defaultBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.xs,
    borderRadius: SIZES.radiusFull,
  },
  defaultText: {
    color: 'white',
    fontSize: SIZES.textXs,
    fontWeight: 'bold',
  },
  cardNumber: {
    color: 'white',
    fontSize: SIZES.textXl,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginVertical: SIZES.lg,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: SIZES.textXs,
    fontWeight: 'bold',
    marginBottom: SIZES.xs,
  },
  cardName: {
    color: 'white',
    fontSize: SIZES.textSm,
    fontWeight: 'bold',
  },
  cardExpiry: {
    color: 'white',
    fontSize: SIZES.textSm,
    fontWeight: 'bold',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: SIZES.md,
    marginTop: SIZES.lg,
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusMd,
  },
  actionButtonText: {
    color: 'white',
    fontSize: SIZES.textSm,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: SIZES.textSm,
    fontWeight: '500',
  },
  addMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.xl,
    borderRadius: SIZES.radiusLg,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    backgroundColor: COLORS.backgroundLight,
  },
  addMoreText: {
    color: COLORS.primary,
    fontSize: SIZES.textLg,
    fontWeight: '600',
    marginLeft: SIZES.sm,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: SIZES.textXl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  cancelText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.textLg,
  },
  saveText: {
    color: COLORS.primary,
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: SIZES.lg,
  },
  inputGroup: {
    marginBottom: SIZES.lg,
  },
  inputLabel: {
    fontSize: SIZES.textSm,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SIZES.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.lg,
    fontSize: SIZES.textBase,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.background,
  },
  row: {
    flexDirection: 'row',
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    padding: SIZES.lg,
    borderRadius: SIZES.radiusMd,
    marginTop: SIZES.xl,
  },
  securityText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.textSm,
    marginLeft: SIZES.sm,
    flex: 1,
  },
});
