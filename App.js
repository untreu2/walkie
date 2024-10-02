import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import AppleHealthKit from 'react-native-health';

const { height } = Dimensions.get('window');

const permissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.StepCount],
  },
};

const App = () => {
  const [stepData, setStepData] = useState([]);
  const [quote, setQuote] = useState('');

  const quotes = [
    "The journey of a thousand miles begins with a single step.",
    "Walking is the best possible exercise. Habituate yourself to walk very far.",
    "All truly great thoughts are conceived while walking.",
    "An early-morning walk is a blessing for the whole day.",
    "Everywhere is walking distance if you have the time.",
    "I only went out for a walk, and finally concluded to stay out till sundown.",
    "Walking brings me back to myself.",
    "A walk in nature walks the soul back home.",
    "Walking is man's best medicine.",
    "If you seek creative ideas, go walking.",
    "A walk to a park or in nature gives you fresh air.",
    "Life is a journey, and we are always walking forward.",
    "Walking is the perfect way of moving if you want to see the world.",
    "Take a walk to find inspiration.",
    "Walk as if you are kissing the Earth with your feet.",
    "A walk in the park is often the best way to clear your mind.",
    "In every walk with nature, one receives far more than he seeks.",
    "Walk through the storm and know you're not alone.",
    "Walk confidently in the direction of your dreams.",
    "The best remedy for a short temper is a long walk.",
    "Walking is good for solving problems — it's like the feet are little psychiatrists.",
    "A brisk walk is the answer to all of life’s problems.",
    "Take a walk in the woods and bring peace to your soul.",
    "Your legs are your best friend, keep walking.",
    "Walking makes the world much more intimate.",
    "Walking restores your senses and your peace of mind.",
    "Walking is the best therapy.",
    "To walk in nature is to witness a thousand miracles.",
    "Go for a walk and see where life takes you.",
    "Walking is the adventure waiting outside your door.",
    "Walk the path you’ve always wanted to take.",
    "Let your feet do the talking when words are too hard to find.",
    "Every step you take is a step closer to where you need to be.",
    "Walking brings your mind back to clarity.",
    "The way you walk says everything about your journey.",
    "Take a step outside and change your perspective.",
    "Walking teaches you patience and perseverance.",
    "Walking is how the mind regains its balance.",
    "A walk is the perfect antidote to stress.",
    "Go for a walk and you will find answers you didn’t know you were looking for.",
    "Walking teaches you to appreciate the simple things.",
    "A walk clears your head and opens your heart.",
    "Take a walk, breathe deep, and let go of your worries.",
    "Let your feet take you to places your heart yearns for.",
    "Walking is discovering something new around every corner.",
    "A walk a day keeps your mind in play.",
    "Let the rhythm of your walk guide you.",
    "To walk is to free your thoughts and find yourself.",
    "Walk with purpose, but allow for detours.",
    "Your next step could lead you to unexpected joys.",
    "Walking gives you time to think, time to breathe.",
    "Every step is progress, no matter how small.",
    "Walking helps to align the body and mind.",
    "Take a walk to find your own rhythm.",
    "A walk helps you reset, refocus, and restart.",
    "Walking is a gentle path to freedom.",
    "Step into the world and take it all in.",
    "Walking connects you to the earth and to yourself.",
    "Your path unfolds with each step you take.",
    "Walking creates space for the soul to breathe.",
    "When in doubt, walk it out.",
    "Walking leads to clarity, to peace, to insight.",
    "A walk is the first step to a new perspective.",
    "Walking is moving meditation.",
    "Let each step remind you of your strength.",
    "Walk the road less traveled and discover new wonders.",
    "Walking invites you to slow down and see more.",
    "The simple act of walking can spark great ideas.",
    "Let your feet take you to new adventures.",
    "Walking allows you to reconnect with nature and yourself.",
    "Walk to clear your head and fill your heart.",
    "Walking turns every day into a new discovery.",
    "Let the path unfold as you walk it.",
    "Every walk is an invitation to new discoveries.",
    "Walking nurtures the body and the soul.",
    "Take a walk, and let your imagination run wild.",
    "Walking gives your mind the space to roam free.",
    "Let each step bring you closer to clarity.",
    "Walking opens the door to new possibilities.",
    "A walk is a journey to reconnect with yourself.",
    "Walking gives your thoughts room to breathe.",
    "Step by step, you'll get there.",
    "A walk can change everything.",
    "Walking is the simplest way to unlock creativity.",
    "Walk with intention, and let the world unfold.",
    "Take a walk, and leave your troubles behind.",
    "Walking offers a new perspective with each step.",
    "Let walking be your daily therapy.",
    "The act of walking brings peace to the soul.",
    "A walk is an open invitation to dream.",
    "Walk and witness the world from a new angle.",
    "Let each step ground you in the present moment.",
    "Walking is a reminder that progress is made one step at a time.",
    "When you walk, you feel more connected to everything around you.",
    "Walking is how we experience the rhythm of life.",
    "A walk allows you to disconnect from stress and reconnect with life.",
    "Every step in a walk is a step towards serenity."
  ];

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);

    AppleHealthKit.initHealthKit(permissions, (error) => {
      if (error) {
        console.log("HealthKit initialization error: ", error);
        return;
      }

      const options = {
        startDate: new Date(2023, 0, 1).toISOString(),
        endDate: new Date().toISOString(),
      };

      AppleHealthKit.getDailyStepCountSamples(options, (err, results) => {
        if (err) {
          console.log("Error fetching step count samples: ", err);
          return;
        }

        const groupedData = results.reduce((acc, item) => {
          const date = new Date(item.startDate).toLocaleDateString();
          const steps = Math.round(item.value);
          if (!acc[date]) {
            acc[date] = steps;
          } else {
            acc[date] += steps;
          }
          return acc;
        }, {});

        const formattedData = Object.keys(groupedData).map(date => ({
          date,
          value: groupedData[date],
        })).sort((a, b) => new Date(b.date) - new Date(a.date));

        setStepData(formattedData);
      });
    });
  }, []);

  const renderStepItem = ({ item }) => {
    const isToday = item.date === new Date().toLocaleDateString();

    return (
      <View style={[styles.stepItem, isToday && styles.todayItem]}>
        <View style={styles.stepRow}>
          <Text style={[styles.dateText, isToday && styles.todayDate]}>
            {isToday ? 'Today' : item.date}
          </Text>
          <Text style={[styles.stepText, isToday && styles.todayStep]}>
            Steps: {item.value}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteText}>{quote}</Text>
      </View>

      <FlatList
        contentContainerStyle={styles.listContainer}
        data={stepData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderStepItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#000',
  },
  quoteContainer: {
    height: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  quoteText: {
    fontSize: 24, 
    color: '#fff',
    textAlign: 'center',
    fontStyle: 'italic',
    marginHorizontal: 20,
  },
  listContainer: {
    paddingBottom: 50,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  stepItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#333',
    borderRadius: 8,
    width: '90%', 
    alignSelf: 'center', 
  },
  stepRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  todayItem: {
    backgroundColor: '#00cc66', 
  },
  dateText: {
    fontSize: 16,
    color: '#fff',
  },
  stepText: {
    fontSize: 16,
    color: '#fff',
  },
  todayDate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  todayStep: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default App;
