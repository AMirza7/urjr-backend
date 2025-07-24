import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import type { Section } from '../types/sections';

interface Props {
  route: { params: { section: Section } };
}

export default function SectionDetail({ route }: Props) {
  const { act, number, title, fullText } = route.params.section;
  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
        {act} Sec. {number}: {title}
      </Text>
      <Text style={{ marginTop: 12, lineHeight: 22 }}>
        {fullText}
      </Text>
    </ScrollView>
  );
}
