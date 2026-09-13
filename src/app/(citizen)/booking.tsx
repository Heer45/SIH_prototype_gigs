import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { FontFamily, FontSize, FontWeight } from '@/constants/typography';
import { Shadows } from '@/constants/shadows';
import Header from '@/components/Header';
import { pickFromGallery, takePhoto } from '@/services/camera';

const timeSlots = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM', '7:00 PM'];
const dates = [
  { day: 'Today', date: '10 Sep' },
  { day: 'Thu', date: '11 Sep' },
  { day: 'Fri', date: '12 Sep' },
  { day: 'Sat', date: '13 Sep' },
  { day: 'Sun', date: '14 Sep' },
];

export default function BookingScreen() {
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(1);
  const [urgency, setUrgency] = useState<'normal' | 'urgent' | 'emergency'>('normal');
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const handlePickPhoto = async () => {
    const uri = await pickFromGallery();
    if (uri) {
      setPhotoUri(uri);
    }
  };

  const handleTakePhoto = async () => {
    const uri = await takePhoto();
    if (uri) {
      setPhotoUri(uri);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Electrical Repair"
        subtitle="Fill details to find the best worker"
        showBack
      />

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* Problem Description */}
        <View style={[styles.card, Shadows.card]}>
          <Text style={styles.label}>Describe the Problem *</Text>
          <TextInput
            style={styles.textArea}
            placeholder="e.g. Power socket in bedroom not working, tripped breaker twice..."
            placeholderTextColor={Colors.textTertiary}
            multiline
            numberOfLines={3}
            value={description}
            onChangeText={setDescription}
          />

          {photoUri ? (
            <View style={styles.photoPreviewContainer}>
              <Image source={{ uri: photoUri }} style={styles.photoPreview} />
              <TouchableOpacity
                style={styles.removePhotoButton}
                onPress={() => setPhotoUri(null)}
              >
                <Ionicons name="close-circle" size={24} color={Colors.error} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.photoActionsRow}>
              <TouchableOpacity
                style={styles.photoButton}
                activeOpacity={0.8}
                onPress={handlePickPhoto}
              >
                <Ionicons name="image-outline" size={18} color={Colors.primary} />
                <Text style={styles.photoButtonText}>Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.photoButton}
                activeOpacity={0.8}
                onPress={handleTakePhoto}
              >
                <Ionicons name="camera-outline" size={18} color={Colors.primary} />
                <Text style={styles.photoButtonText}>Take Photo</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Date Selection */}
        <View style={[styles.card, Shadows.card]}>
          <Text style={styles.label}>Select Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.datesRow}>
            {dates.map((d, i) => {
              const isSelected = selectedDate === i;
              return (
                <TouchableOpacity
                  key={i}
                  style={[styles.dateButton, isSelected && styles.dateButtonSelected]}
                  activeOpacity={0.8}
                  onPress={() => setSelectedDate(i)}
                >
                  <Text style={[styles.dateDay, isSelected && styles.dateDaySelected]}>
                    {d.day}
                  </Text>
                  <Text style={[styles.dateNumber, isSelected && styles.dateNumberSelected]}>
                    {d.date}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Time slots */}
        <View style={[styles.card, Shadows.card]}>
          <Text style={styles.label}>Preferred Time</Text>
          <View style={styles.timesGrid}>
            {timeSlots.map((t, i) => {
              const isSelected = selectedTime === i;
              return (
                <TouchableOpacity
                  key={i}
                  style={[styles.timeButton, isSelected && styles.timeButtonSelected]}
                  activeOpacity={0.8}
                  onPress={() => setSelectedTime(i)}
                >
                  <Text style={[styles.timeText, isSelected && styles.timeTextSelected]}>
                    {t}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Urgency */}
        <View style={[styles.card, Shadows.card]}>
          <Text style={styles.label}>Urgency Level</Text>
          <View style={styles.urgencyRow}>
            {[
              { id: 'normal' as const, label: 'Normal', icon: '🟢', bg: '#E5F5EE', color: '#2F6F57' },
              { id: 'urgent' as const, label: 'Urgent', icon: '🟡', bg: '#FEF3C7', color: '#D97706' },
              { id: 'emergency' as const, label: 'Emergency', icon: '🔴', bg: '#FCEAEA', color: '#EF4444' },
            ].map((u) => {
              const isSelected = urgency === u.id;
              return (
                <TouchableOpacity
                  key={u.id}
                  style={[
                    styles.urgencyButton,
                    isSelected && { backgroundColor: u.bg, borderColor: u.color },
                  ]}
                  activeOpacity={0.8}
                  onPress={() => setUrgency(u.id)}
                >
                  <Text style={{ fontSize: 16 }}>{u.icon}</Text>
                  <Text
                    style={[
                      styles.urgencyLabel,
                      isSelected ? { color: u.color } : { color: Colors.textSecondary },
                    ]}
                  >
                    {u.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Submit */}
        <TouchableOpacity
          style={[styles.submitButton, Shadows.button]}
          activeOpacity={0.85}
          onPress={() => router.push('/(citizen)/worker-match')}
        >
          <Text style={styles.submitButtonText}>Find Workers</Text>
          <Ionicons name="search" size={18} color={Colors.white} />
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
    gap: Spacing.base,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.card,
    padding: Spacing.screen,
  },
  label: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    marginBottom: Spacing.base,
  },
  textArea: {
    backgroundColor: Colors.background,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    padding: Spacing.base,
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  photoActionsRow: {
    flexDirection: 'row',
    gap: Spacing.base,
    marginTop: Spacing.base,
  },
  photoButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: Colors.secondary,
    borderStyle: 'dashed',
    backgroundColor: '#F4FBF7',
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  photoButtonText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs,
    color: Colors.primary,
  },
  photoPreviewContainer: {
    marginTop: Spacing.base,
    position: 'relative',
    height: 120,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  photoPreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  removePhotoButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.full,
  },
  datesRow: {
    gap: Spacing.md,
  },
  dateButton: {
    width: 60,
    paddingVertical: Spacing.base,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    alignItems: 'center',
    gap: 2,
  },
  dateButtonSelected: {
    backgroundColor: Colors.primary,
  },
  dateDay: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  dateDaySelected: {
    color: 'rgba(255,255,255,0.8)',
  },
  dateNumber: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
  },
  dateNumberSelected: {
    color: Colors.white,
  },
  timesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  timeButton: {
    width: '30%',
    flexGrow: 1,
    paddingVertical: Spacing.base,
    borderRadius: BorderRadius.sm,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  timeButtonSelected: {
    borderColor: Colors.primary,
    backgroundColor: '#E5F5EE',
  },
  timeText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  timeTextSelected: {
    color: Colors.primary,
  },
  urgencyRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  urgencyButton: {
    flex: 1,
    paddingVertical: Spacing.base,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    alignItems: 'center',
    gap: 4,
  },
  urgencyLabel: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xs,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.xl,
    borderRadius: BorderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.base,
    marginTop: Spacing.base,
  },
  submitButtonText: {
    fontFamily: FontFamily.heading,
    fontWeight: FontWeight.extraBold,
    fontSize: FontSize.lg,
    color: Colors.white,
  },
});
