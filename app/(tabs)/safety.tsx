import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MapPin, Phone, History, TriangleAlert as AlertTriangle, Navigation, Users } from 'lucide-react-native';
import { colors } from '@/constants/colors';

const mockFamilyLocations = [
  {
    id: 1,
    name: 'Tata',
    location: 'Birou - Strada Victoriei 24',
    lastUpdate: '2 min în urmă',
    avatar: 'https://images.pexels.com/photos/1270076/pexels-photo-1270076.jpeg?auto=compress&cs=tinysrgb&w=300',
    coordinates: { lat: 44.4268, lng: 26.1025 }
  },
  {
    id: 2,
    name: 'Mama',
    location: 'Supermarket Mega Image',
    lastUpdate: '5 min în urmă',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    coordinates: { lat: 44.4268, lng: 26.1025 }
  },
  {
    id: 3,
    name: 'Andrei',
    location: 'Acasă',
    lastUpdate: '1 min în urmă',
    avatar: 'https://images.pexels.com/photos/1374510/pexels-photo-1374510.jpeg?auto=compress&cs=tinysrgb&w=300',
    coordinates: { lat: 44.4268, lng: 26.1025 }
  },
  {
    id: 4,
    name: 'Maria',
    location: 'Școală - Liceul Teoretic',
    lastUpdate: '15 min în urmă',
    avatar: 'https://images.pexels.com/photos/3771679/pexels-photo-3771679.jpeg?auto=compress&cs=tinysrgb&w=300',
    coordinates: { lat: 44.4268, lng: 26.1025 }
  }
];

const emergencyContacts = [
  {
    id: 1,
    name: 'Poliție',
    number: '112',
    icon: 'police'
  },
  {
    id: 2,
    name: 'Ambulanță',
    number: '112',
    icon: 'ambulance'
  },
  {
    id: 3,
    name: 'Pompieri',
    number: '112',
    icon: 'fire'
  },
  {
    id: 4,
    name: 'Bunica',
    number: '0722 123 456',
    avatar: 'https://images.pexels.com/photos/2050994/pexels-photo-2050994.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

export default function SafetyScreen() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mapPreview}>
        <View style={styles.mapPlaceholder}>
          <MapPin size={32} color={colors.primary} />
          <Text style={styles.mapText}>Hartă Familie</Text>
        </View>
        <TouchableOpacity style={styles.viewMapButton}>
          <Text style={styles.viewMapText}>Vezi hartă completă</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Users size={20} color={colors.text} />
          <Text style={styles.sectionTitle}>Locații membri familie</Text>
        </View>
        {mockFamilyLocations.map((member) => (
          <TouchableOpacity 
            key={member.id} 
            style={styles.locationCard}
            onPress={() => setSelectedLocation(member.id)}
          >
            <Image source={{ uri: member.avatar }} style={styles.avatar} />
            <View style={styles.locationInfo}>
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.location}>{member.location}</Text>
              <Text style={styles.timestamp}>{member.lastUpdate}</Text>
            </View>
            <TouchableOpacity style={styles.navigationButton}>
              <Navigation size={20} color={colors.primary} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <AlertTriangle size={20} color={colors.text} />
          <Text style={styles.sectionTitle}>Contacte de urgență</Text>
        </View>
        <View style={styles.emergencyGrid}>
          {emergencyContacts.map((contact) => (
            <TouchableOpacity key={contact.id} style={styles.emergencyContact}>
              {contact.avatar ? (
                <Image source={{ uri: contact.avatar }} style={styles.emergencyAvatar} />
              ) : (
                <View style={[styles.emergencyIcon, { backgroundColor: colors.error }]}>
                  <Phone size={24} color="white" />
                </View>
              )}
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactNumber}>{contact.number}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <History size={20} color={colors.text} />
          <Text style={styles.sectionTitle}>Istoric locații</Text>
        </View>
        <TouchableOpacity style={styles.historyCard}>
          <Text style={styles.historyTitle}>Vizualizează istoricul locațiilor</Text>
          <Text style={styles.historyDescription}>
            Vezi unde au fost membrii familiei în ultimele zile
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mapPreview: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#F5F7FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    color: colors.primary,
    marginTop: 10,
  },
  viewMapButton: {
    padding: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  viewMapText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: colors.primary,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: colors.text,
    marginLeft: 10,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  locationInfo: {
    flex: 1,
    marginLeft: 15,
  },
  memberName: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: colors.text,
  },
  location: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: colors.text,
    marginTop: 2,
  },
  timestamp: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  navigationButton: {
    padding: 10,
  },
  emergencyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emergencyContact: {
    width: '48%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  emergencyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  emergencyIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  contactName: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: colors.text,
    marginBottom: 5,
  },
  contactNumber: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: colors.textLight,
  },
  historyCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  historyTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: colors.text,
    marginBottom: 5,
  },
  historyDescription: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: colors.textLight,
  },
});