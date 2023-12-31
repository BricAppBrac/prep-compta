import { useEffect, useCallback } from "react";
import Papa from "papaparse";
import { TextDecoder } from "text-encoding";

const ReadSourceBPEP = ({ fileUrl, handleDataRead }) => {
  console.log("ReadSourceBPEP");
  console.log("fileUrl : " + fileUrl);

  const readCsvFile = useCallback(
    async (url) => {
      try {
        const response = await fetch(url);

        // Convertir la réponse en tableau de bytes
        const buffer = await response.arrayBuffer();

        // Utiliser TextDecoder pour convertir les bytes en chaîne de texte
        const text = new TextDecoder().decode(buffer);

        // Utilisation de papaparse pour traiter le fichier CSV
        const parsedData = await new Promise((resolve) => {
          Papa.parse(text, {
            header: false,
            dynamicTyping: true,
            skipEmptyLines: true,

            complete: (results) => resolve(results.data),
            error: (error) =>
              console.error("Erreur lors de l'analyse CSV :", error),
            transform: (value, header) => {
              // Ajouter des conversions personnalisées si nécessaire
              if (header === 6) {
                // Colonne 6: Convertir en nombre si possible
                console.log("value:", value);

                // Supprimer les espaces comme séparateur de milliers
                const formattedValue = value.toString().replace(/\s/g, "");

                const numberValue = parseFloat(
                  formattedValue.replace(",", ".")
                );
                return isNaN(numberValue) ? value : numberValue;
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

export default ReadSourceBPEP;
