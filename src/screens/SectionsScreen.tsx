// src/screens/SectionsScreen.tsx
import React, { useState }               from 'react';
import { TextInput, View, TouchableOpacity, Button } from 'react-native';
import { FlatList, Text }                from 'react-native';
import { Picker }                        from '@react-native-picker/picker';
import { useNavigation }                 from '@react-navigation/native';
import type { StackNavigationProp }      from '@react-navigation/stack';

import { searchSections, clearSectionCache, refreshSectionCache } from '../utils/sectionSearch';
import type { Section }                  from '../types/sections';

// Define your stack’s param list
type RootStackParamList = {
  List: undefined;
  Detail: { section: Section };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'List'>;

export default function SectionsScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [act,     setAct]     = useState<Section['act'] | 'All'>('All');
  const [query,   setQuery]   = useState('');
  const [results, setResults] = useState<Section[]>([]);

  const onSearch = async (q: string) => {
    setQuery(q);
    setResults(await searchSections(act, q));
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Picker
        selectedValue={act}
        onValueChange={(value: Section['act'] | 'All') => {
          setAct(value);
          setResults([]);
        }}
      >
        <Picker.Item label="All Acts" value="All" />
        <Picker.Item label="IPC"   value="IPC" />
        <Picker.Item label="CrPC"  value="CrPC" />
        <Picker.Item label="CPC"   value="CPC" />
        <Picker.Item label="BNS"   value="BNS" />
        <Picker.Item label="BNSS"  value="BNSS" />
        <Picker.Item label="BSA"   value="BSA" />
      </Picker>

      <TextInput
        placeholder={`Search ${act}…`}
        value={query}
        onChangeText={onSearch}
        style={{ marginVertical: 12, borderBottomWidth: 1, padding: 8 }}
      />

      {/* Cache controls */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
        <Button title="Clear Cache"   onPress={() => clearSectionCache(act as Section['act'])} />
        <Button title="Refresh Cache" onPress={() => refreshSectionCache(act as Section['act'])} />
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => `${item.act}-${item.number}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Detail', { section: item })}
            style={{ marginBottom: 16 }}
          >
            <Text style={{ fontWeight: 'bold' }}>
              {item.act} Sec. {item.number}: {item.title}
            </Text>
            <Text numberOfLines={3} ellipsizeMode="tail">
              {item.fullText}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
