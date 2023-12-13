import { useEffect, useCallback } from "react";
import * as XLSX from "xlsx";

const ReadSource = ({ fileUrl, handleDataRead }) => {
  console.log("ReadSource");
  console.log("fileUrl : " + fileUrl);

  const readExcelFile = useCallback(
    (url) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "arraybuffer";

      xhr.onload = (e) => {
        const arraybuffer = xhr.response;
        const data = new Uint8Array(arraybuffer);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convertir le contenu de la feuille en tableau JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Modifier les données pour traiter les dates
        const formattedData = jsonData
          .filter((row) =>
            row.some((cell) => typeof cell === "string" && cell.trim() !== "")
          ) // Supprimer les lignes vides
          .map((row) =>
            row.map((cell, columnIndex) =>
              columnIndex === 0 && isDateCell(cell)
                ? convertToFormattedDate(cell)
                : cell
            )
          );

        // Appeler la fonction fournie pour transmettre les données à un autre composant
        handleDataRead(formattedData);
      };

      xhr.send();
    },
    [handleDataRead]
  );

  useEffect(() => {
    if (fileUrl) {
      readExcelFile(fileUrl);
    }
  }, [fileUrl, readExcelFile]);

  const isDateCell = (value) => {
    // Vérifier si la valeur est un nombre (format de numéro de série pour les dates)
    if (typeof value === "number") {
      // Utiliser une méthode de JavaScript pour vérifier si la valeur est une date valide
      const dateObject = new Date((value - 1) * 24 * 60 * 60 * 1000);
      return !isNaN(dateObject.getTime());
    }
    return false;
  };

  const convertToFormattedDate = (value) => {
    // Convertir le numéro de série en date format JJ/MM/YYYY
    const dateObject = new Date((value - 25569) * 86400 * 1000); // 25569 est l'offset pour le 1er janvier 1970
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Ce composant n'affiche rien à l'écran
  return null;
};
export default ReadSource;
