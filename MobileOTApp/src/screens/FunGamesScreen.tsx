
import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { Card, Title, Paragraph, Button, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ANIMAL_PAIRS = [
  {
    id: 1,
    name: 'Cat',
    image: 'https://placekitten.com/200/200',
    sound: 'meow'
  },
  {
    id: 2,
    name: 'Dog',
    image: 'https://place-puppy.com/200x200',
    sound: 'woof'
  },
  {
    id: 3,
    name: 'Elephant',
    image: 'https://picsum.photos/200/200?random=1',
    sound: 'trumpet'
  },
  {
    id: 4,
    name: 'Lion',
    image: 'https://picsum.photos/200/200?random=2',
    sound: 'roar'
  },
  {
    id: 5,
    name: 'Cow',
    image: 'https://picsum.photos/200/200?random=3',
    sound: 'moo'
  },
  {
    id: 6,
    name: 'Sheep',
    image: 'https://picsum.photos/200/200?random=4',
    sound: 'baa'
  }
];

export default function FunGamesScreen() {
  const [gameCards, setGameCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Create pairs of cards
    const cards = [];
    ANIMAL_PAIRS.forEach(animal => {
      cards.push({ ...animal, cardId: `${animal.id}-1`, isFlipped: false, isMatched: false });
      cards.push({ ...animal, cardId: `${animal.id}-2`, isFlipped: false, isMatched: false });
    });
    
    // Shuffle cards
    const shuffled = cards.sort(() => Math.random() - 0.5);
    setGameCards(shuffled);
    setFlippedCards([]);
    setMatchedPairs([]);
    setScore(0);
  };

  const handleCardPress = (cardId) => {
    if (flippedCards.length === 2) return;
    
    const updatedCards = gameCards.map(card => {
      if (card.cardId === cardId && !card.isMatched) {
        return { ...card, isFlipped: true };
      }
      return card;
    });
    
    setGameCards(updatedCards);
    
    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);
    
    if (newFlippedCards.length === 2) {
      checkForMatch(newFlippedCards);
    }
  };

  const checkForMatch = (flippedCardIds) => {
    const [card1Id, card2Id] = flippedCardIds;
    const card1 = gameCards.find(c => c.cardId === card1Id);
    const card2 = gameCards.find(c => c.cardId === card2Id);
    
    setTimeout(() => {
      if (card1.id === card2.id) {
        // Match found!
        setGameCards(prevCards => 
          prevCards.map(card => {
            if (card.id === card1.id) {
              return { ...card, isMatched: true };
            }
            return { ...card, isFlipped: false };
          })
        );
        setMatchedPairs(prev => [...prev, card1.id]);
        setScore(prev => prev + 10);
        
        // Check if game is complete
        if (matchedPairs.length + 1 === ANIMAL_PAIRS.length) {
          Alert.alert('Congratulations!', 'You matched all the animals! 🎉', [
            { text: 'Play Again', onPress: initializeGame }
          ]);
        }
      } else {
        // No match, flip cards back
        setGameCards(prevCards => 
          prevCards.map(card => ({ ...card, isFlipped: false }))
        );
      }
      setFlippedCards([]);
    }, 1000);
  };

  const startGame = () => {
    setGameStarted(true);
    initializeGame();
  };

  if (!gameStarted) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon name="pets" size={48} color="white" />
          <Title style={styles.title}>Fun Games</Title>
          <Paragraph style={styles.subtitle}>
            Educational and entertaining games for kids
          </Paragraph>
        </View>
        
        <View style={styles.content}>
          <Card style={styles.gameCard}>
            <Card.Content>
              <Title style={styles.gameTitle}>Animal Matching Game</Title>
              <Paragraph style={styles.gameDescription}>
                Find matching pairs of animals! Tap two cards to flip them and try to match the same animals together.
              </Paragraph>
              <Button 
                mode="contained" 
                onPress={startGame}
                style={styles.startButton}
                icon="play-arrow"
              >
                Start Game
              </Button>
            </Card.Content>
          </Card>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="pets" size={48} color="white" />
        <Title style={styles.title}>Animal Matching</Title>
        <Paragraph style={styles.subtitle}>
          Score: {score} | Matches: {matchedPairs.length}/{ANIMAL_PAIRS.length}
        </Paragraph>
      </View>

      <View style={styles.content}>
        <View style={styles.gameControls}>
          <Button 
            mode="outlined" 
            onPress={initializeGame}
            style={styles.controlButton}
            icon="refresh"
          >
            New Game
          </Button>
        </View>

        <View style={styles.gameGrid}>
          {gameCards.map((card) => (
            <TouchableOpacity
              key={card.cardId}
              style={[
                styles.gameCard,
                card.isFlipped || card.isMatched ? styles.flippedCard : styles.hiddenCard
              ]}
              onPress={() => handleCardPress(card.cardId)}
              disabled={card.isFlipped || card.isMatched || flippedCards.length === 2}
            >
              {card.isFlipped || card.isMatched ? (
                <View style={styles.cardContent}>
                  <Image 
                    source={{ uri: card.image }} 
                    style={styles.animalImage}
                    resizeMode="cover"
                  />
                  <Paragraph style={styles.animalName}>{card.name}</Paragraph>
                </View>
              ) : (
                <View style={styles.cardBack}>
                  <Icon name="pets" size={40} color="#fff" />
                  <Paragraph style={styles.questionMark}>?</Paragraph>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {matchedPairs.length === ANIMAL_PAIRS.length && (
          <Card style={styles.congratsCard}>
            <Card.Content style={styles.congratsContent}>
              <Icon name="celebration" size={48} color="#10b981" />
              <Title style={styles.congratsTitle}>Great Job!</Title>
              <Paragraph style={styles.congratsText}>
                You matched all the animals! Final Score: {score}
              </Paragraph>
              <Button 
                mode="contained" 
                onPress={initializeGame}
                style={styles.playAgainButton}
              >
                Play Again
              </Button>
            </Card.Content>
          </Card>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 24,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  subtitle: {
    color: 'white',
    opacity: 0.9,
    textAlign: 'center',
    marginTop: 8,
  },
  content: {
    padding: 16,
  },
  gameCard: {
    elevation: 2,
    marginBottom: 16,
  },
  gameTitle: {
    fontSize: 20,
    color: '#374151',
    marginBottom: 8,
  },
  gameDescription: {
    color: '#6b7280',
    marginBottom: 16,
  },
  startButton: {
    backgroundColor: '#8b5cf6',
  },
  gameControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  controlButton: {
    borderColor: '#8b5cf6',
  },
  gameGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  gameCard: {
    width: '30%',
    aspectRatio: 0.8,
    margin: '1.5%',
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  flippedCard: {
    backgroundColor: '#fff',
  },
  hiddenCard: {
    backgroundColor: '#8b5cf6',
  },
  cardContent: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animalImage: {
    width: '100%',
    height: '70%',
    borderRadius: 8,
  },
  animalName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 4,
    textAlign: 'center',
  },
  cardBack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionMark: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  congratsCard: {
    elevation: 4,
    marginTop: 16,
  },
  congratsContent: {
    alignItems: 'center',
    padding: 16,
  },
  congratsTitle: {
    color: '#10b981',
    fontSize: 24,
    marginTop: 8,
  },
  congratsText: {
    textAlign: 'center',
    color: '#6b7280',
    marginVertical: 8,
  },
  playAgainButton: {
    backgroundColor: '#10b981',
    marginTop: 8,
  },
});
