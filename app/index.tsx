import { supabase } from '@/supabase';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
import React, { JSX, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// -----------------------------------------------------------
// NOTE: This component uses standard React/HTML elements and 
// Tailwind CSS classes to ensure compilation in this environment.
// The core Supabase logic remains identical to the intended setup.
// -----------------------------------------------------------

interface StatusBoxProps {
    session: Session | null;
}

const StatusBox: React.FC<StatusBoxProps> = ({ session }) => {
    return (
        <View style={styles.container}>
            
            <Text>Supabase Setup (TS)</Text>

            {session ? (
                <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-lg space-y-2">
                    <Text>User is Signed In!</Text>
                    <Text>User ID:</Text> 
                    <Text>{session.user.id.substring(0, 8)}...</Text> 
                    <button
                        onClick={() => supabase.auth.signOut()}
                        className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition"
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                <View>
                    <Text>No Active Session.</Text>
                    <Text>Ready for Sign In/Sign Up (using an external component or form).
                    </Text>
                              <Pressable
            style={styles.button}
            onPress={() => () => alert('Add your sign-in form here!')}>
            <Text style={(styles.text, styles.buttonText)}>Demo Sign In Click</Text>
          </Pressable>
                </View>
            )}
        </View>
    );
};


export default function App(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  // The session state can be Session object or null
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // 1. Check for an active session on startup
    const initialSessionCheck = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      setLoading(false);
    };
    initialSessionCheck();

    // 2. Set up a listener for real-time auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, currentSession: Session | null) => {
        setSession(currentSession);
        // Ensure initial loading state is cleared after the first check/event
        if (loading) setLoading(false);
      }
    );

    // Cleanup the subscription when the component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Checking session status...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <StatusBox session={session} />
      </View>
  );
}



// import Button from "@/components/button";
// import { Link } from "expo-router";
// import { Pressable, StyleSheet, Text, View } from "react-native";

// export default function Index() {
//   return ( <View
//       style={styles.container}
//     >
//     <View style={[styles.card, styles.shadowProp]}>
//         <View>
//           <Text style={styles.heading}>
//             RN-E-Commerce
//           </Text>
//         </View>
//         <Text>
//           Using the elevation style prop to apply box-shadow for iOS devices
//         </Text>
//       </View>
//       <View style={styles.action}>
//           <Link href={"/home/page"} asChild>
//           <Button bg="" onPress={()=>{}} title={"Home"} />
//           </Link>
          // <Pressable
          //   style={styles.button}
          //   onPress={() => console.log('pressed')}>
          //   <Text style={(styles.text, styles.buttonText)}>Login</Text>
          // </Pressable>
//         </View>
//     </View>
//   );
// }

// // remember to import StyleSheet from react-native
const styles = StyleSheet.create({
  container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding:16
      },
//   heading: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 13,
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     paddingVertical: 45,
//     paddingHorizontal: 25,
//     width: '100%',
//     marginVertical: 10,
//   },
//   shadowProp: {
//     shadowColor: '#171717',
//     shadowOffset: {width: -2, height: 4},
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },
  button: {
    backgroundColor: '#4830D3',
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    borderRadius: 4,
    marginTop: 30,
    flex:1
  },
  buttonText: {
    color: '#fff',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
//   action:{
//     width:"100%",
//     display:"flex",
//     flexDirection:"row",
//     gap:16
//   }
});