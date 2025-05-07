import React, { useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import styles from './Rules.styles.js'
import { PokerBackground, NavBar } from '../../components'
import { logic } from '../../logic'
import { Ionicons } from '@expo/vector-icons'

export default function RulesScreen({ navigation }) {
  useEffect(() => {
    logic.getUsername()
      .then(username => {
        navigation.setOptions({
          headerShown: false // ocultamos el header de navegación para personalizarlo
        })
      })
  }, [])

  return (
    <PokerBackground>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#f4e04d" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>RULES</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {[
          '1. Se ha creado un nuevo rango, el invitado vip, un invitado que ha venido regularmente y ha demostrado su nivel. Actualmente este rango serán Domi i Gloria.',
          '2. Hasta ahora se necesitaban 3 fundadores para crear una timba de ranking. Ahora será necesario un mínimo de 1 fundador + fundadores o invitados vip hasta llegar a un total de 3. Es decir, 1 fundador + 2 invitados vip sería una timba de ranking (de esta manera favorecemos a que hayan más timbas).',
          '3. Para que un invitado (o invitado vip) se clasifique a una timba final de campeones se hará lo siguiente: se cogerá al top 3 de invitados durante esa fase regular y se votará entre los fundadores al que haya demostrado mejor nivel (normalmente el top 1) y accederá a la timba final (puede acceder + de 1 invitado a la final). Si un invitado gana la fase regular accede automáticamente a la final.',
          '4. El sistema de puntuación para la fase regular se mantiene igual (los invitados vip en el sistema de puntuación cuentan como invitados). Cada jugador que participe en una timba y pierda dicha timba se le restará 0,5p. El jugador que gane dicha timba ganará, por cada jugador al que derrote en la timba, 0,5p si es un jugador no fundador del torneo (es decir un invitado) y 1p si es fundador del torneo (roca, Joan, sots, Marc o Kobeaga). De esta manera favorecemos que los invitados siempre tengan ventaja respecto a los fundadores.',
          '5. Ahora las timbas finales cuentan también para el ranking histórico de victorias.',
          '6. Si un jugador abandona una timba, pierde automáticamente esa timba, se aparta el dinero de esa persona y no se usa más , a no ser que todos los jugadores de la timba voten lo contrario de manera unánime.',
          '7. Al principio de cada timba se puede acordar la incorporación o no de las recompras, estableciendo en esa misma timba el límite de dichas recompras (votando de manera unánime) y pagando para ellas el doble de el pago inicial (en el sistema de puntuación contaría como -1 y no como -0,5 si pierde dicha timba con recompra).'
        ].map((text, index) => (
          <View key={index} style={styles.ruleCard}>
            <Text style={styles.rule}>{text}</Text>
          </View>
        ))}
      </ScrollView>

      <NavBar navigation={navigation} />
    </PokerBackground>
  )
}
