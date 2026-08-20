import { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DynamicModal } from './dynamic-modal';

export function FAQuestions({ children }: { children: ReactNode }) {
  return (
    <DynamicModal title="Change Password" trigger={<>{children}</>}>
      {/* Main Modal Body */}
      <View>
        <Text style={styles.modalBodyText}>
          Enter your promo code or choose from active discounts below.
        </Text>

        <TouchableOpacity style={styles.applyBtn}>
          <Text style={styles.applyBtnText}>Apply FIRST50 ($50 Off)</Text>
        </TouchableOpacity>
      </View>
    </DynamicModal>
  );
}

const styles = StyleSheet.create({
  triggerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 8,
  },
  triggerText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
  modalBodyText: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 20,
  },
  applyBtn: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    alignItems: 'center',
  },
  applyBtnText: {
    color: '#2563EB',
    fontWeight: '700',
  },
});
