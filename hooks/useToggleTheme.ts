import { useState, useEffect } from 'react';
import { Appearance } from 'react-native';

const useTheme = () => {
  // Initialize theme with the system's current color scheme
  const [theme, setTheme] = useState(Appearance.getColorScheme() || 'light');

  useEffect(() => {
    // Listener to detect theme changes from the system
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme as any); // Update the theme when the system changes
    });

    // Cleanup subscription on unmount
    return () => subscription.remove();
  }, []);

  // Function to toggle the theme manually
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return {
    theme,
    toggleTheme,
  };
};

export default useTheme;
