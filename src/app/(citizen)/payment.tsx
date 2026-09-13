import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { FontFamily, FontSize, FontWeight } from '@/constants/typography';
import { Shadows } from '@/constants/shadows';
import Header from '@/components/Header';
import { initiatePayment, PaymentMethod } from '@/services/payment';

const paymentMethods: { id: PaymentMethod; label: string; icon: string; color: string }[] = [
  { id: 'googlepay', label: 'Google Pay', icon: '🟢', color: '#E8F5E9' },
  { id: 'phonepe', label: 'PhonePe', icon: '🟣', color: '#F3E5F5' },
  { id: 'paytm', label: 'Paytm', icon: '🔵', color: '#E3F2FD' },
  { id: 'upi', label: 'UPI ID', icon: '💳', color: '#FFF8E1' },
];

export default function PaymentScreen() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('googlepay');
  const [contributed, setContributed] = useState(true);
  const [loading, setLoading] = useState(false);

  const workerAmount = 475;
  const contribution = contributed ? 25 : 0;
  const total = workerAmount + contribution;

  const handlePay = async () => {
    setLoading(true);
    try {
      const res = await initiatePayment(total, selectedMethod, 'Electrical Repair - Rajesh Kumar');
      if (res.success) {
        router.push('/(citizen)/payment-success');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Secure Payment" subtitle="UPI · Instant · Safe" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* Worker & Service Summary */}
        <View style={styles.serviceSummaryCard}>
          <View style={styles.summaryIconBox}>
            <Ionicons name="flash" size={24} color={Colors.white} />
          </View>
          <View style={styles.summaryInfo}>
            <Text style={styles.summaryTitle}>Electrical Repair</Text>
            <Text style={styles.summarySubtitle}>Rajesh Kumar · Today, 11:00 AM</Text>
          </View>
          <Text style={styles.summaryPrice}>₹{total}</Text>
        </View>

        {/* Payment Summary */}
        <View style={[styles.card, { backgroundColor: Colors.paymentCard }]}>
          <Text style={styles.cardTitle}>Payment Summary</Text>

          <View style={styles.breakdownRows}>
            <View style={styles.summaryRow}>
              <Text style={styles.rowLabel}>Service</Text>
              <Text style={styles.rowValue}>Electrical Repair</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.rowLabel}>Worker Payment</Text>
              <Text style={styles.rowValueBold}>₹{workerAmount}</Text>
            </View>

            {/* Community Contribution Box */}
            <View style={styles.contributionBox}>
              <View style={styles.contributionLeft}>
                <Text style={{ fontSize: 18 }}>🌍</Text>
                <View>
                  <Text style={styles.contributionTitle}>Community Help Fund</Text>
                  <Text style={styles.contributionSubtitle}>Funds cleanup drives nearby</Text>
                </View>
              </View>
              <View style={styles.contributionRight}>
                <Text style={styles.contributionAmount}>₹25</Text>
                <Switch
                  value={contributed}
                  onValueChange={setContributed}
                  trackColor={{ false: Colors.border, true: Colors.primary }}
                  thumbColor={Colors.white}
                />
              </View>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalAmount}>₹{total}</Text>
            </View>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={[styles.card, Shadows.card]}>
          <Text style={styles.cardTitle}>Pay via UPI</Text>
          <View style={styles.methodsGrid}>
            {paymentMethods.map((pm) => {
              const isSelected = selectedMethod === pm.id;
              return (
                <TouchableOpacity
                  key={pm.id}
                  style={[
                    styles.methodButton,
                    { backgroundColor: isSelected ? pm.color : Colors.background },
                    isSelected && styles.methodButtonSelected,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => setSelectedMethod(pm.id)}
                >
                  <Text style={{ fontSize: 20 }}>{pm.icon}</Text>
                  <Text style={styles.methodLabel}>{pm.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Security badge */}
        <View style={styles.securityBadge}>
          <Ionicons name="lock-closed" size={14} color={Colors.textTertiary} />
          <Text style={styles.securityText}>
            Powered by NPCI · 256-bit encrypted · RBI compliant
          </Text>
        </View>

        {/* Pay Button */}
        <TouchableOpacity
          style={[styles.payButton, Shadows.button]}
          activeOpacity={0.85}
          disabled={loading}
          onPress={handlePay}
        >
          <Text style={styles.payButtonText}>
            {loading ? 'Processing...' : `Pay ₹${total} →`}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: Spacing.screen,
    gap: Spacing.base + 2,
  },
  serviceSummaryCard: {
    backgroundColor: Colors.workerCard,
    borderRadius: BorderRadius.xl,
    padding: Spacing.screen,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
  },
  summaryIconBox: {
    width: 46,
    height: 46,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryInfo: {
    flex: 1,
  },
  summaryTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.sm + 1,
    color: Colors.textPrimary,
  },
  summarySubtitle: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  summaryPrice: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.lg,
    color: Colors.primary,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.card,
    padding: Spacing.screen,
  },
  cardTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
    marginBottom: Spacing.base,
  },
  breakdownRows: {
    gap: Spacing.base,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLabel: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs + 1,
    color: Colors.textSecondary,
  },
  rowValue: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs + 1,
    color: Colors.textPrimary,
  },
  rowValueBold: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs + 1,
    color: Colors.textPrimary,
  },
  contributionBox: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.secondary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contributionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  contributionTitle: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs,
    color: Colors.textPrimary,
  },
  contributionSubtitle: {
    fontFamily: FontFamily.body,
    fontSize: 9,
    color: Colors.textSecondary,
  },
  contributionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  contributionAmount: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs + 1,
    color: Colors.primary,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.base,
    borderTopWidth: 1.5,
    borderTopColor: '#C6EAD8',
  },
  totalLabel: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
  },
  totalAmount: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.xxl,
    color: Colors.primary,
  },
  methodsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.base,
  },
  methodButton: {
    width: '47%',
    flexGrow: 1,
    padding: Spacing.base,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  methodButtonSelected: {
    borderColor: Colors.primary,
  },
  methodLabel: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs + 1,
    color: Colors.textPrimary,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  securityText: {
    fontFamily: FontFamily.body,
    fontSize: 10,
    color: Colors.textTertiary,
  },
  payButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.xl,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButtonText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.black,
    fontSize: FontSize.lg,
    color: Colors.white,
  },
});
