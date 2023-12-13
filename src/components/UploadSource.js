import React, { useState } from "react";
import ReadSource from "../components/ReadSource";
import ListeDebits from "../components/ListeDebits";

const UploadSource = () => {
  const [sourceName, setSourceName] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [setTableData] = useState([]);
  const [filteredSecondTable, setFilteredSecondTable] = useState([]);

  // Stocke le fichier sélectionné
  const handleFileChange = (event) => {
    console.log("handleFileChange");
    const file = event.target.files[0];
    console.log("file.name");
    console.log(file.name);
    setSourceName(file.name);

    setFileUrl(URL.createObjectURL(file));
    console.log("fileUrl");
    console.log(fileUrl);
  };

  // Fonction pour traiter les données lues du fichier Excel
  const handleDataRead = (data) => {
    console.log("handleDataRead");
    console.log("data");
    console.log(data);
    // résultat de la 1ère lecture du fichier source
    setTableData(data);
    // En deuxième lecture, mettre sur la même ligne les informations ref, motif, etc.
    handleDataSecondRead(data);
  };

  const isValidDate = (dateString) => {
    const regexDate = /^\d{1,2}\/\d{2}\/\d{4}$/;
    return regexDate.test(dateString);
  };

  const handleDataSecondRead = (data) => {
    // En deuxième lecture, mettre sur la même ligne les informations ref, motif, etc.
    console.log("handleDataSecondRead");
    const secondTable = [];
    let currentRow = [];
    let foundFirstDate = false;
    let foundNextDate = false;
    let currentDate = null;

    for (let i = 0; i < data.length && i < 1000; i++) {
      // Ignorer les premières lignes jusqu'à la première date
      if (!foundFirstDate && !isValidDate(data[i][0])) {
        console.log("ligne ignorée : " + i + " / " + data[i][0]);
        continue;
      }
      // Première ligne - First date found
      else if (!foundFirstDate && isValidDate(data[i][0])) {
        foundFirstDate = true;

        currentDate = data[i][0];
        console.log("firstline found : " + i + " / " + data[i][0]);
      }

      // Lignes suivantes, première date comprise
      if (foundFirstDate && isValidDate(data[i][0])) {
        foundNextDate = true;
        currentDate = data[i][0];
      } else if (foundFirstDate && !isValidDate(data[i][0])) {
        foundNextDate = false;
      }

      if (foundNextDate) {
        // Si nous avons des données en cours, ajoutons-les au deuxième tableau
        if (currentRow.length > 0) {
          secondTable.push(currentRow);
          console.log("nouvelle ligne à ajouter au tableau");
          console.log(currentRow);
          currentRow = [];
        }

        // Commencer une nouvelle ligne avec la date
        currentRow = [currentDate, data[i][2], data[i][3], data[i][1]];
        console.log("prep nvelle ligne");
        console.log(currentRow);
      } else if (data[i][1]) {
        // Ajouter les données de la ligne au deuxième tableau
        currentRow.push(data[i][1]);
        console.log("suite nvelle ligne");
        console.log(currentRow);
      }
      if (i === 1000) {
        console.log("fichier source trop grand ?");
      }
    }

    // Ajouter la dernière ligne au deuxième tableau
    if (currentRow.length > 0) {
      secondTable.push(currentRow);
    }
    // Filtrer le tableau, ne garder que les débits et supprimer la cellule[3]

    console.log("secondTable avant filtre");
    console.log(secondTable);

    // Filtrer secondTable pour ne conserver que les lignes avec la cellule[1] renseignée (débits)
    const filteredTable = secondTable.filter(
      (row) => row[1] !== undefined && row[1] !== null && row[1] !== ""
    );
    setFilteredSecondTable(filteredTable);
    console.log("secondTable après filtre");
    console.log(filteredSecondTable);

    // Retourner le tableau filtré
    return filteredSecondTable;
  };

  return (
    <div className="upload-content">
      <div className="upload-head">
        <div className="upload-title">
          <h3>*****************************</h3>
          <h3>FICHIER SOURCE A TRAITER :</h3>
          <h3>*****************************</h3>
        </div>
        <div className="source-name">
          <h3>*****************************</h3>
          <h3>
            {sourceName ? (
              <div>
                {sourceName}

                <div className="liste-content">
                  <ReadSource
                    fileUrl={fileUrl}
                    handleDataRead={handleDataRead}
                  />
                </div>
              </div>
            ) : (
              <div className="upload-file">
                <input type="file" accept=".xlsx" onChange={handleFileChange} />
              </div>
            )}
          </h3>
        </div>
      </div>
      <div className="liste-debits">
        {sourceName && filteredSecondTable ? (
          <div className="liste-content">
            <ListeDebits
              filteredSecondTable={filteredSecondTable}
              sourceName={sourceName}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UploadSource;
