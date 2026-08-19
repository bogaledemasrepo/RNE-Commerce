import { Ionicons } from '@expo/vector-icons';
import { ReactNode, useCallback, useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface DynamicModalProps {
  /** The clickable element that opens the modal */
  trigger?: ReactNode;
  /** Modal body content */
  children: ReactNode;
  /** Optional header title */
  title?: string;
  /** Controlled open state (if managing state externally) */
  isOpen?: boolean;
  /** Callback fired when modal closes */
  onClose?: () => void;
  /** Height preset for sheet behavior */
  maxHeight?: number | `${number}%`;
  /** Show top drag indicator line */
  showHandle?: boolean;
}

export function DynamicModal({
  trigger,
  children,
  title,
  isOpen: externalIsOpen,
  onClose,
  maxHeight = '85%',
  showHandle = true,
}: DynamicModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const isControlled = externalIsOpen !== undefined;
  const visible = isControlled ? externalIsOpen : internalIsOpen;

  const handleOpen = useCallback(() => {
    if (!isControlled) setInternalIsOpen(true);
  }, [isControlled]);

  const handleClose = useCallback(() => {
    if (!isControlled) setInternalIsOpen(false);
    onClose?.();
  }, [isControlled, onClose]);

  return (
    <>
      {/* 1. Dynamic Trigger Render */}
      {trigger && (
        <TouchableOpacity activeOpacity={0.8} onPress={handleOpen}>
          {trigger}
        </TouchableOpacity>
      )}

      {/* 2. Modal Overlay & Sheet Container */}
      <Modal
        visible={visible}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={handleClose}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.overlayContainer}
        >
          {/* Animated Dimmed Backdrop */}
          <Animated.View
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            style={styles.backdrop}
          >
            <TouchableWithoutFeedback onPress={handleClose}>
              <View style={StyleSheet.absoluteFill} />
            </TouchableWithoutFeedback>
          </Animated.View>

          {/* Animated Modal Bottom Sheet */}
          <Animated.View
            entering={SlideInDown.damping(28).stiffness(300)}
            //entering={SlideInDown.springify().damping(28).stiffness(300)}
            exiting={SlideOutDown.duration(200)}
            style={[styles.modalSheet, { maxHeight }]}
          >
            {/* Top Drag Handle */}
            {showHandle && <View style={styles.dragHandle} />}

            {/* Modal Header */}
            <View style={styles.headerContainer}>
              <Animated.Text style={styles.headerTitle}>{title ?? ''}</Animated.Text>
              <TouchableOpacity
                onPress={handleClose}
                style={styles.closeButton}
                activeOpacity={0.7}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="close" size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            {/* Main Modal Body */}
            <View style={styles.contentContainer}>{children}</View>
          </Animated.View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(15, 23, 42, 0.55)', // Modern slate dark backdrop
  },
  modalSheet: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 38 : 24,
    paddingTop: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 16,
  },
  dragHandle: {
    width: 38,
    height: 5,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingTop: 16,
  },
});
