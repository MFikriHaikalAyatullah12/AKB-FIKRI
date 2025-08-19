import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Linking,
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

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface SupportTicket {
  subject: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
}

export default function HelpSupportPage() {
  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'ticket'>('faq');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showTicketModal, setShowTicketModal] = useState(false);
  
  const [ticket, setTicket] = useState<SupportTicket>({
    subject: '',
    description: '',
    category: 'general',
    priority: 'medium',
  });

  const faqData: FAQItem[] = [
    {
      id: '1',
      question: 'How do I track my order?',
      answer: 'You can track your order by going to the Order History section in your profile or by using the tracking number sent to your email.',
      category: 'orders',
    },
    {
      id: '2',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all items in original condition. Items must be unworn and with tags attached.',
      category: 'returns',
    },
    {
      id: '3',
      question: 'How long does delivery take?',
      answer: 'Standard delivery takes 3-5 business days. Express delivery takes 1-2 business days. International orders may take 7-14 business days.',
      category: 'shipping',
    },
    {
      id: '4',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, Amex), PayPal, Apple Pay, and Google Pay.',
      category: 'payment',
    },
    {
      id: '5',
      question: 'How do I change my password?',
      answer: 'Go to your Profile > Settings > Security and tap on "Change Password". You will need to enter your current password and create a new one.',
      category: 'account',
    },
    {
      id: '6',
      question: 'Can I cancel my order?',
      answer: 'You can cancel your order within 1 hour of placing it if it hasn\'t been processed yet. After that, you may return the item once delivered.',
      category: 'orders',
    },
    {
      id: '7',
      question: 'How do I use a discount code?',
      answer: 'Enter your discount code in the "Promo Code" field during checkout. The discount will be applied automatically if the code is valid.',
      category: 'payment',
    },
    {
      id: '8',
      question: 'What if I receive a damaged item?',
      answer: 'If you receive a damaged item, please contact us immediately with photos. We will arrange for a replacement or full refund.',
      category: 'returns',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Topics', icon: 'help-circle-outline' },
    { id: 'orders', name: 'Orders', icon: 'bag-outline' },
    { id: 'shipping', name: 'Shipping', icon: 'car-outline' },
    { id: 'returns', name: 'Returns', icon: 'return-up-back-outline' },
    { id: 'payment', name: 'Payment', icon: 'card-outline' },
    { id: 'account', name: 'Account', icon: 'person-outline' },
  ];

  const contactOptions = [
    {
      id: 'chat',
      title: 'Live Chat',
      description: 'Chat with our support team',
      icon: 'chatbubble-outline',
      action: () => Alert.alert('Live Chat', 'Connecting to live chat...'),
      available: true,
    },
    {
      id: 'email',
      title: 'Email Support',
      description: 'support@fashionstore.com',
      icon: 'mail-outline',
      action: () => Linking.openURL('mailto:support@fashionstore.com'),
      available: true,
    },
    {
      id: 'phone',
      title: 'Phone Support',
      description: '+1 (555) 123-4567',
      icon: 'call-outline',
      action: () => Linking.openURL('tel:+15551234567'),
      available: true,
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      description: 'Message us on WhatsApp',
      icon: 'logo-whatsapp',
      action: () => Linking.openURL('https://wa.me/15551234567'),
      available: true,
    },
  ];

  const ticketCategories = [
    { id: 'general', name: 'General Inquiry' },
    { id: 'technical', name: 'Technical Issue' },
    { id: 'order', name: 'Order Problem' },
    { id: 'account', name: 'Account Issue' },
    { id: 'billing', name: 'Billing Question' },
    { id: 'feedback', name: 'Feedback' },
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSubmitTicket = () => {
    if (!ticket.subject.trim() || !ticket.description.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Simulate ticket submission
    Alert.alert(
      'Ticket Submitted',
      'Your support ticket has been submitted successfully. We will get back to you within 24 hours.',
      [
        {
          text: 'OK',
          onPress: () => {
            setShowTicketModal(false);
            setTicket({
              subject: '',
              description: '',
              category: 'general',
              priority: 'medium',
            });
          }
        }
      ]
    );
  };

  const renderFAQ = () => (
    <View style={styles.faqContainer}>
      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.textLight} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search FAQ..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryChip,
              selectedCategory === category.id && styles.activeCategoryChip
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Ionicons 
              name={category.icon as any} 
              size={16} 
              color={selectedCategory === category.id ? 'white' : COLORS.textSecondary} 
            />
            <Text style={[
              styles.categoryText,
              selectedCategory === category.id && styles.activeCategoryText
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* FAQ List */}
      <ScrollView style={styles.faqList} showsVerticalScrollIndicator={false}>
        {filteredFAQs.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={60} color={COLORS.textLight} />
            <Text style={styles.emptyTitle}>No FAQ Found</Text>
            <Text style={styles.emptyMessage}>
              Try adjusting your search or browse different categories
            </Text>
          </View>
        ) : (
          filteredFAQs.map(faq => (
            <TouchableOpacity
              key={faq.id}
              style={styles.faqItem}
              onPress={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Ionicons 
                  name={expandedFAQ === faq.id ? 'chevron-up' : 'chevron-down'} 
                  size={20} 
                  color={COLORS.textSecondary} 
                />
              </View>
              {expandedFAQ === faq.id && (
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              )}
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );

  const renderContact = () => (
    <ScrollView style={styles.contactContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Get in Touch</Text>
      <Text style={styles.sectionDescription}>
        Choose your preferred way to contact our support team
      </Text>

      <View style={styles.contactOptions}>
        {contactOptions.map(option => (
          <TouchableOpacity
            key={option.id}
            style={styles.contactOption}
            onPress={option.action}
          >
            <View style={styles.contactIcon}>
              <Ionicons name={option.icon as any} size={24} color={COLORS.primary} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>{option.title}</Text>
              <Text style={styles.contactDescription}>{option.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.hoursContainer}>
        <Text style={styles.hoursTitle}>Support Hours</Text>
        <View style={styles.hoursItem}>
          <Text style={styles.hoursDay}>Monday - Friday</Text>
          <Text style={styles.hoursTime}>9:00 AM - 6:00 PM EST</Text>
        </View>
        <View style={styles.hoursItem}>
          <Text style={styles.hoursDay}>Saturday</Text>
          <Text style={styles.hoursTime}>10:00 AM - 4:00 PM EST</Text>
        </View>
        <View style={styles.hoursItem}>
          <Text style={styles.hoursDay}>Sunday</Text>
          <Text style={styles.hoursTime}>Closed</Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderTicket = () => (
    <ScrollView style={styles.ticketContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Submit a Ticket</Text>
      <Text style={styles.sectionDescription}>
        Describe your issue and we'll get back to you as soon as possible
      </Text>

      <TouchableOpacity 
        style={styles.createTicketButton}
        onPress={() => setShowTicketModal(true)}
      >
        <Ionicons name="add" size={20} color="white" />
        <Text style={styles.createTicketText}>Create New Ticket</Text>
      </TouchableOpacity>

      <View style={styles.ticketInfo}>
        <View style={styles.infoItem}>
          <Ionicons name="time-outline" size={20} color={COLORS.primary} />
          <Text style={styles.infoText}>Average response time: 2-4 hours</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="checkmark-circle-outline" size={20} color={COLORS.success} />
          <Text style={styles.infoText}>98% customer satisfaction rate</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="people-outline" size={20} color={COLORS.primary} />
          <Text style={styles.infoText}>Dedicated support team</Text>
        </View>
      </View>
    </ScrollView>
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
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'faq' && styles.activeTab]}
          onPress={() => setActiveTab('faq')}
        >
          <Ionicons 
            name="help-circle-outline" 
            size={20} 
            color={activeTab === 'faq' ? COLORS.primary : COLORS.textSecondary} 
          />
          <Text style={[
            styles.tabText,
            activeTab === 'faq' && styles.activeTabText
          ]}>
            FAQ
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'contact' && styles.activeTab]}
          onPress={() => setActiveTab('contact')}
        >
          <Ionicons 
            name="call-outline" 
            size={20} 
            color={activeTab === 'contact' ? COLORS.primary : COLORS.textSecondary} 
          />
          <Text style={[
            styles.tabText,
            activeTab === 'contact' && styles.activeTabText
          ]}>
            Contact
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'ticket' && styles.activeTab]}
          onPress={() => setActiveTab('ticket')}
        >
          <Ionicons 
            name="ticket-outline" 
            size={20} 
            color={activeTab === 'ticket' ? COLORS.primary : COLORS.textSecondary} 
          />
          <Text style={[
            styles.tabText,
            activeTab === 'ticket' && styles.activeTabText
          ]}>
            Tickets
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === 'faq' && renderFAQ()}
        {activeTab === 'contact' && renderContact()}
        {activeTab === 'ticket' && renderTicket()}
      </View>

      {/* Create Ticket Modal */}
      <Modal
        visible={showTicketModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowTicketModal(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>New Support Ticket</Text>
            <TouchableOpacity onPress={handleSubmitTicket}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Subject *</Text>
              <TextInput
                style={styles.input}
                placeholder="Brief description of your issue"
                value={ticket.subject}
                onChangeText={(text) => setTicket(prev => ({ ...prev, subject: text }))}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Category</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.categoryRow}>
                  {ticketCategories.map(category => (
                    <TouchableOpacity
                      key={category.id}
                      style={[
                        styles.categoryOption,
                        ticket.category === category.id && styles.selectedCategory
                      ]}
                      onPress={() => setTicket(prev => ({ ...prev, category: category.id }))}
                    >
                      <Text style={[
                        styles.categoryOptionText,
                        ticket.category === category.id && styles.selectedCategoryText
                      ]}>
                        {category.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Priority</Text>
              <View style={styles.priorityRow}>
                {(['low', 'medium', 'high'] as const).map(priority => (
                  <TouchableOpacity
                    key={priority}
                    style={[
                      styles.priorityOption,
                      ticket.priority === priority && styles.selectedPriority
                    ]}
                    onPress={() => setTicket(prev => ({ ...prev, priority }))}
                  >
                    <Text style={[
                      styles.priorityText,
                      ticket.priority === priority && styles.selectedPriorityText
                    ]}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Please provide detailed information about your issue..."
                value={ticket.description}
                onChangeText={(text) => setTicket(prev => ({ ...prev, description: text }))}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
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
  placeholder: {
    width: 40,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.backgroundLight,
    margin: SIZES.lg,
    borderRadius: SIZES.radiusFull,
    padding: SIZES.xs,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.md,
    borderRadius: SIZES.radiusFull,
    gap: SIZES.sm,
  },
  activeTab: {
    backgroundColor: COLORS.background,
    ...SHADOWS.small,
  },
  tabText: {
    fontSize: SIZES.textSm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  // FAQ Styles
  faqContainer: {
    flex: 1,
    padding: SIZES.lg,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.md,
    borderRadius: SIZES.radiusFull,
    marginBottom: SIZES.lg,
  },
  searchInput: {
    flex: 1,
    marginLeft: SIZES.md,
    fontSize: SIZES.textBase,
    color: COLORS.textPrimary,
  },
  categoriesScroll: {
    marginBottom: SIZES.lg,
  },
  categoriesContainer: {
    paddingHorizontal: SIZES.sm,
    gap: SIZES.sm,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusFull,
    gap: SIZES.xs,
  },
  activeCategoryChip: {
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    fontSize: SIZES.textSm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  activeCategoryText: {
    color: 'white',
    fontWeight: 'bold',
  },
  faqList: {
    flex: 1,
  },
  faqItem: {
    backgroundColor: COLORS.background,
    padding: SIZES.lg,
    borderRadius: SIZES.radiusLg,
    marginBottom: SIZES.sm,
    ...SHADOWS.small,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: SIZES.textBase,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: SIZES.md,
  },
  faqAnswer: {
    fontSize: SIZES.textSm,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginTop: SIZES.md,
    paddingTop: SIZES.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  // Contact Styles
  contactContainer: {
    flex: 1,
    padding: SIZES.lg,
  },
  sectionTitle: {
    fontSize: SIZES.text2xl,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SIZES.md,
  },
  sectionDescription: {
    fontSize: SIZES.textBase,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: SIZES.xl,
  },
  contactOptions: {
    gap: SIZES.sm,
    marginBottom: SIZES.xl,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: SIZES.lg,
    borderRadius: SIZES.radiusLg,
    ...SHADOWS.small,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: SIZES.radiusLg,
    backgroundColor: COLORS.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.lg,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SIZES.xs,
  },
  contactDescription: {
    fontSize: SIZES.textSm,
    color: COLORS.textSecondary,
  },
  hoursContainer: {
    backgroundColor: COLORS.backgroundLight,
    padding: SIZES.lg,
    borderRadius: SIZES.radiusLg,
  },
  hoursTitle: {
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SIZES.lg,
  },
  hoursItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.sm,
  },
  hoursDay: {
    fontSize: SIZES.textBase,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  hoursTime: {
    fontSize: SIZES.textBase,
    color: COLORS.textSecondary,
  },
  // Ticket Styles
  ticketContainer: {
    flex: 1,
    padding: SIZES.lg,
  },
  createTicketButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.lg,
    borderRadius: SIZES.radiusLg,
    marginBottom: SIZES.xl,
    ...SHADOWS.medium,
  },
  createTicketText: {
    color: 'white',
    fontSize: SIZES.textLg,
    fontWeight: 'bold',
    marginLeft: SIZES.sm,
  },
  ticketInfo: {
    gap: SIZES.lg,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: SIZES.lg,
    borderRadius: SIZES.radiusLg,
    ...SHADOWS.small,
  },
  infoText: {
    fontSize: SIZES.textBase,
    color: COLORS.textPrimary,
    marginLeft: SIZES.md,
    fontWeight: '500',
  },
  // Modal Styles
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
  submitText: {
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
  textArea: {
    height: 120,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: SIZES.sm,
  },
  categoryOption: {
    backgroundColor: COLORS.backgroundLight,
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.md,
    borderRadius: SIZES.radiusFull,
  },
  selectedCategory: {
    backgroundColor: COLORS.primary,
  },
  categoryOptionText: {
    fontSize: SIZES.textSm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: 'white',
    fontWeight: 'bold',
  },
  priorityRow: {
    flexDirection: 'row',
    gap: SIZES.sm,
  },
  priorityOption: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
    paddingVertical: SIZES.md,
    borderRadius: SIZES.radiusMd,
    alignItems: 'center',
  },
  selectedPriority: {
    backgroundColor: COLORS.primary,
  },
  priorityText: {
    fontSize: SIZES.textSm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  selectedPriorityText: {
    color: 'white',
    fontWeight: 'bold',
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
  },
});
