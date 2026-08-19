import { Feather, FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import COLORS from '@/constants/color';

interface MenuItemProps {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  value?: string;
  isDestructive?: boolean;
}
const MenuItem: React.FC<MenuItemProps> = ({ icon, title, value, isDestructive = false }) => (
  <View style={styles.menuItem}>
    <View style={styles.menuItemLeft}>
      <View style={[styles.iconBadge, isDestructive && styles.iconBadgeDestructive]}>
        <Feather
          name={icon}
          size={18}
          color={isDestructive ? '#EF4444' : COLORS.primary || '#4830D3'}
        />
      </View>
      <Text style={[styles.menuItemTitle, isDestructive && styles.menuItemTitleDestructive]}>
        {title}
      </Text>
    </View>

    <View style={styles.menuItemRight}>
      {value && <Text style={styles.menuItemValue}>{value}</Text>}
      <FontAwesome name="angle-right" size={18} color="#9CA3AF" />
    </View>
  </View>
);
export default MenuItem;

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(72, 48, 211, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBadgeDestructive: {
    backgroundColor: '#FEF2F2',
  },
  menuItemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  menuItemTitleDestructive: {
    color: '#EF4444',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuItemValue: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});
