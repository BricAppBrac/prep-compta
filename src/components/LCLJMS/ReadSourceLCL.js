import { useEffect, useCallback } from "react";
import Papa from "papaparse";
import { TextDecoder } from "text-encoding";

const ReadSourceLCL = ({ fileUrl, handleDataRead }) => {
  console.log("ReadSourceLCL");
  console.log("fileUrl : " + fileUrl);

  const removeAccents = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase();
  };

  const readCsvFile = useCallback(
    async (url) => {
      try {
        const response = await fetch(url);

        // Convertir la réponse en tableau de bytes
        const buffer = await response.arrayBuffer();

        // Utiliser TextDecoder pour convertir les bytes en chaîne de texte
        const text = new TextDecoder().decode(buffer);

        // Séparer le texte en lignes et supprimer la dernière ligne
        const lines = text.split("\n");
        if (lines.length > 0) {
          lines.pop(); // Supprime la dernière ligne
        }
        const modifiedText = lines.join("\n");

        // Utilisation de papaparse pour traiter le fichier CSV
        const parsedData = await new Promise((resolve) => {
          Papa.parse(modifiedText, {
            header: false,
            dynamicTyping: true,
            skipEmptyLines: true,

            complete: (results) => resolve(results.data),
            error: (error) =>
              console.error("Erreur lors de l'analyse CSV :", error),
            transform: (value, header) => {
              // Ajouter des conversions personnalisées si nécessaire
              if (header === 1) {
                // Colonne 1: Convertir en nombre si possible
                console.log("value:", value);

                // Supprimer les espaces comme séparateur de milliers
                const formattedValue = value.toString().replace(/\s/g, "");

                const numberValue = parseFloat(
                  formattedValue.replace(",", ".")
                );
                return isNaN(numberValue) ? value : numberValue;
              }
              if (header === 2) {
                // Colonne 2: Supprimer les accents et convertir en majuscules
                const transformedValue = removeAccents(
                  value.toString()
                ).toUpperCase();
                return transformedValue;
              }
              // Ajoutez d'autres conversions personnalisées au besoin
              return value;
            },
          });
        });

        // Appeler la fonction fournie pour transmettre les données à un autre composant
        console.log("READ SOURCE parsedData");
        console.log(parsedData);
        handleDataRead(parsedData);
      } catch (error) {
        console.error("Erreur lors de la lecture du fichier CSV :", error);
      }
    },
    [handleDataRead]
  );
  // eslint-disable-next-line
  const memoizedReadCsvFile = useCallback(readCsvFile, []);

  useEffect(() => {
    if (fileUrl) {
      memoizedReadCsvFile(fileUrl);
    }
  }, [fileUrl, memoizedReadCsvFile]);

  // Ce composant n'affiche rien à l'écran
  return null;
};

export default ReadSourceLCL;
