const getRandomColor = () => {
    const colors = [
      "4CAF50", // Medium Green
      "388E3C", // Darker Green
      "2E7D32", // Deep Green
      "1B5E20", // Forest Green
      "66BB6A", // Light Green
      "FF9800", // Orange
      "F44336", // Red
      "03A9F4", // Sky Blue
      "9C27B0", // Purple
      "FFEB3B", // Yellow
      "FF5722", // Deep Orange
      "00BCD4", // Cyan
      "8BC34A", // Light Olive Green
      "607D8B", // Muted Blue-Gray
      "795548", // Warm Brown
    ];
    // Shades of green
    return colors[Math.floor(Math.random() * colors.length)];
    };
  
  export default getRandomColor;