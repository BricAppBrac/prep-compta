import React, { useState } from "react";
import ReadSourceSG from "../components/SG/ReadSourceSG";
import ReadSourceBPEP from "../components/BPEP/ReadSourceBPEP";
import ReadSourceLCL from "../components/LCLJMS/ReadSourceLCL";
import ReadSourceCIC from "../components/CIC/ReadSourceCIC";
import ListeDebitsSG from "../components/SG/ListeDebitsSG";
import ListeCreditsSG from "../components/SG/ListeCreditsSG";

import ListeDebitsBPEP from "../components/BPEP/ListeDebitsBPEP";
import ListeCreditsBPEP from "../components/BPEP/ListeCreditsBPEP";

import ListeDebitsLCL from "../components/LCLJMS/ListeDebitsLCL";
import ListeCreditsLCL from "../components/LCLJMS/ListeCreditsLCL";
import ListeDebitsCIC from "../components/CIC/ListeDebitsCIC";
import ListeCreditsCIC from "../components/CIC/ListeCreditsCIC";

const UploadSource = () => {
  const [sourceName, setSourceName] = useState(null);
  const [sourceType, setSourceType] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const [debitsTable, setDebitsTable] = useState([]);
  const [creditsTable, setCreditsTable] = useState([]);

  // Stocke le fichier sélectionné url et name
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

  // Fonction pour traiter les données lues du fichier Csv
  const handleDataRead = (csvData) => {
    console.log("handleDataRead");
    console.log("csvData");
    console.log(csvData);

    if (sourceType === "SGEP" || sourceType === "SGJMS") {
      handleDataSecondRead(csvData);
    } else if (sourceType === "BPEP") {
      handleDataSecondReadBP(csvData);
    } else if (sourceType === "LCLJMS") {
      handleDataSecondReadLCL(csvData);
    } else if (sourceType === "CICBIA") {
      handleDataSecondReadCIC(csvData);
    }
  };

  const isValidDate = (dateString) => {
    const regexDate = /^\d{1,2}\/\d{2}\/\d{4}$/;
    return regexDate.test(dateString);
  };

  const handleDataSecondRead = (data) => {
    // En deuxième lecture, mettre sur la même ligne les informations ref, motif, etc.
    console.log("handleDataSecondRead");
    // secondTable contient les débits et les crédits
    const secondTable = [];
    let currentRow = [];
    let foundFirstDate = false;
    let foundNextDate = false;
    let currentDate = null;

    console.log("data.length");
    console.log(data.length);

    for (let i = 0; i < data.length; i++) {
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

        // Commencer une nouvelle ligne avec la date , montant débit, montant crédit, libellé
        currentRow = [currentDate, data[i][2], data[i][3], data[i][1]];
        console.log("prep nvelle ligne");
        console.log(currentRow);
      } else if (data[i][1]) {
        // Ajouter les données de la ligne au deuxième tableau
        currentRow.push(data[i][1]);
        console.log("suite nvelle ligne");
        console.log(currentRow);
      }
    }

    if (!foundFirstDate) {
      console.log("Aucune date trouvée");
      return;
    }

    // Ajouter la dernière ligne au deuxième tableau
    if (currentRow.length > 0) {
      secondTable.push(currentRow);
    }
    // Filtrer le tableau, ne garder que les débits d'un côté (debitsTable), ne garder que les crédits de l'autre (creditsTable)

    console.log("secondTable avant filtre");
    console.log(secondTable);

    // Filtrer secondTable pour ne conserver que les lignes avec la cellule[1] renseignée (débits)
    const filteredDebitsTable = secondTable.filter(
      (row) =>
        row[1] !== undefined && row[1] !== null && row[1] !== "" && row[1] !== 0
    );
    setDebitsTable(filteredDebitsTable);

    // Filtrer secondTable pour ne conserver que les lignes avec la cellule[2] renseignée (crédits)
    const filteredCreditsTable = secondTable.filter(
      (row) =>
        row[2] !== undefined && row[2] !== null && row[2] !== "" && row[2] !== 0
    );
    setCreditsTable(filteredCreditsTable);
    console.log("filteredCreditsTable");
    console.log(filteredCreditsTable);
    console.log("filteredDebitsTable");
    console.log(filteredDebitsTable);

    // Retourner les deux tableaux filtrés
    return {
      debitsTable: filteredDebitsTable,
      creditsTable: filteredCreditsTable,
    };
  };

  const handleDataSecondReadBP = (data) => {
    // En deuxième lecture, mettre sur la même ligne les informations ref, motif, etc.
    console.log("handleDataSecondReadBP");
    let currentRow = [];
    // secondTable contient les débits et les crédits
    const secondTable = [];
    console.log("secondTable.length");
    console.log(secondTable.length);

    for (let i = 0; i < data.length; i++) {
      // Ignorer la première ligne
      if (i === 0) {
        console.log("ligne ignorée : " + i + " / " + data[i][0]);
        continue;
      } else {
        // Nouvelle ligne date / montant / libellé / ref
        currentRow = [data[i][2], data[i][6], data[i][3], "BP"];
        console.log("prep nvelle ligne");
        console.log(currentRow);
        secondTable.push(currentRow);
      }
    }

    // Filtrer le tableau, ne garder que les débits d'un côté (debitsTable), ne garder que les crédits de l'autre (creditsTable)

    console.log("secondTable avant filtre");
    console.log(secondTable);

    // Filtrer secondTable pour ne conserver que les lignes avec montant < 0 (débits)
    const filteredDebitsTable = secondTable.filter((row) => {
      return (
        row[1] !== undefined && row[1] !== null && !isNaN(row[1]) && row[1] < 0
      );
    });
    setDebitsTable(filteredDebitsTable);

    // Filtrer secondTable pour ne conserver que les lignes avec montant >= 0 (crédits)
    const filteredCreditsTable = secondTable.filter((row) => {
      return (
        row[1] !== undefined && row[1] !== null && !isNaN(row[1]) && row[1] >= 0
      );
    });
    setCreditsTable(filteredCreditsTable);
    console.log("filteredCreditsTable");
    console.log(filteredCreditsTable);
    console.log("filteredDebitsTable");
    console.log(filteredDebitsTable);
    // Retourner les deux tableaux filtrés
    return {
      debitsTable: filteredDebitsTable,
      creditsTable: filteredCreditsTable,
    };
  };

  const handleDataSecondReadLCL = (data) => {
    // En deuxième lecture, mettre sur la même ligne les informations ref, motif, etc.
    console.log("handleDataSecondReadLCL");
    let currentRow = [];
    // secondTable contient les débits et les crédits
    const secondTable = [];
    console.log("secondTable.length");
    console.log(secondTable.length);

    for (let i = 0; i < data.length; i++) {
      // Nouvelle ligne date / montant / libellé / ref
      data[i][1] >= 0
        ? (currentRow = [data[i][0], data[i][1], data[i][5], data[i][2]])
        : (currentRow = [data[i][0], data[i][1], data[i][4], data[i][2]]);
      console.log("prep nvelle ligne");
      console.log(currentRow);
      secondTable.push(currentRow);
    }

    // Filtrer le tableau, ne garder que les débits d'un côté (debitsTable), ne garder que les crédits de l'autre (creditsTable)

    console.log("secondTable avant filtre");
    console.log(secondTable);

    // Filtrer secondTable pour ne conserver que les lignes avec la cellule[1] renseignée (débits)
    const filteredDebitsTable = secondTable.filter((row) => {
      return (
        row[1] !== undefined && row[1] !== null && !isNaN(row[1]) && row[1] < 0
      );
    });
    setDebitsTable(filteredDebitsTable);

    // Filtrer secondTable pour ne conserver que les lignes avec la cellule[2] renseignée (crédits)
    const filteredCreditsTable = secondTable.filter((row) => {
      return (
        row[1] !== undefined && row[1] !== null && !isNaN(row[1]) && row[1] >= 0
      );
    });
    setCreditsTable(filteredCreditsTable);
    console.log("filteredCreditsTable");
    console.log(filteredCreditsTable);
    console.log("filteredDebitsTable");
    console.log(filteredDebitsTable);
    // Retourner les deux tableaux filtrés
    return {
      debitsTable: filteredDebitsTable,
      creditsTable: filteredCreditsTable,
    };
  };

  const handleDataSecondReadCIC = (data) => {
    // En deuxième lecture, mettre sur la même ligne les informations ref, motif, etc.
    console.log("handleDataSecondReadCIC");
    let currentRow = [];
    // secondTable contient les débits et les crédits
    const secondTable = [];
    console.log("secondTable.length");
    console.log(secondTable.length);

    // boucle jusqu'à data.length - 1 car on ignore la dernière ligne
    for (let i = 0; i < data.length - 1; i++) {
      // Ignorer les 13 premières lignes
      if (i >= 0 && i <= 12) {
        console.log("ligne ignorée : " + i + " / " + data[i][0]);
        continue;
      } else {
        // Nouvelle ligne date / montant débit / montant crédit / libellé / ref
        currentRow = [
          data[i][1],
          data[i][5] ? data[i][5] : data[i][6],
          data[i][4],
          data[i][8],
        ];
        console.log("prep nvelle ligne");
        console.log(currentRow);
        secondTable.push(currentRow);
      }
    }

    // Filtrer le tableau, ne garder que les débits d'un côté (debitsTable), ne garder que les crédits de l'autre (creditsTable)

    console.log("secondTable avant filtre");
    console.log(secondTable);

    // Filtrer secondTable pour ne conserver que les lignes avec montant < 0 (débits)
    const filteredDebitsTable = secondTable.filter((row) => {
      return (
        row[1] !== undefined && row[1] !== null && !isNaN(row[1]) && row[1] < 0
      );
    });
    setDebitsTable(filteredDebitsTable);

    // Filtrer secondTable pour ne conserver que les lignes avec montant >= 0 (crédits)
    const filteredCreditsTable = secondTable.filter((row) => {
      return (
        row[1] !== undefined && row[1] !== null && !isNaN(row[1]) && row[1] >= 0
      );
    });
    setCreditsTable(filteredCreditsTable);
    console.log("filteredCreditsTable");
    console.log(filteredCreditsTable);
    console.log("filteredDebitsTable");
    console.log(filteredDebitsTable);
    // Retourner les deux tableaux filtrés
    return {
      debitsTable: filteredDebitsTable,
      creditsTable: filteredCreditsTable,
    };
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
              <div>{sourceName}</div>
            ) : (
              <div className="upload-file">
                <input
                  type="file"
                  accept=".csv, .xlsx"
                  onChange={handleFileChange}
                />
              </div>
            )}
          </h3>
        </div>

        <div className="source-type">
          <h3>*****************************</h3>

          <h3>Type de fichier :</h3>

          <h3>
            {!sourceType ? (
              <select onChange={(e) => setSourceType(e.target.value)}>
                <option value="">Choisissez un type</option>
                <option value="SGEP">SG Expertise Plomberie</option>
                <option value="SGJMS">SG JMS</option>
                <option value="BPEP">BP Expertise Plomberie</option>
                <option value="LCLJMS">LCL JMS</option>
                <option value="CICBIA">CIC BIATECH</option>
              </select>
            ) : (
              <div className="div">
                {sourceType === "SGEP" && "SG Expertise Plomberie"}
                {sourceType === "SGJMS" && "SG JMS"}
                {sourceType === "BPEP" && "BP Expertise Plomberie"}
                {sourceType === "LCLJMS" && "LCL JMS"}
                {sourceType === "CICBIA" && "CIC BIATECH"}
              </div>
            )}
          </h3>
        </div>
      </div>
      <div className="liste-content">
        {sourceName && sourceType
          ? (() => {
              switch (sourceType) {
                case "SGEP":
                  return (
                    <ReadSourceSG
                      fileUrl={fileUrl}
                      handleDataRead={handleDataRead}
                    />
                  );
                case "SGJMS":
                  return (
                    <ReadSourceSG
                      fileUrl={fileUrl}
                      handleDataRead={handleDataRead}
                    />
                  );
                case "BPEP":
                  return (
                    <ReadSourceBPEP
                      fileUrl={fileUrl}
                      handleDataRead={handleDataRead}
                    />
                  );
                case "LCLJMS":
                  return (
                    <ReadSourceLCL
                      fileUrl={fileUrl}
                      handleDataRead={handleDataRead}
                    />
                  );
                case "CICBIA":
                  return (
                    <ReadSourceCIC
                      fileUrl={fileUrl}
                      handleDataRead={handleDataRead}
                      sourceType={sourceType}
                    />
                  );
                default:
                  return null;
              }
            })()
          : null}
      </div>
      <div className="liste-debits">
        {sourceName && sourceType && debitsTable ? (
          <div className="liste-content">
            {(() => {
              switch (sourceType) {
                case "SGEP":
                  return (
                    <ListeDebitsSG
                      debitsTable={debitsTable}
                      sourceName={sourceName}
                      sourceType={sourceType}
                    />
                  );
                case "SGJMS":
                  return (
                    <ListeDebitsSG
                      debitsTable={debitsTable}
                      sourceName={sourceName}
                      sourceType={sourceType}
                    />
                  );
                case "BPEP":
                  return (
                    <ListeDebitsBPEP
                      debitsTable={debitsTable}
                      sourceName={sourceName}
                      sourceType={sourceType}
                    />
                  );
                case "LCLJMS":
                  return (
                    <ListeDebitsLCL
                      debitsTable={debitsTable}
                      sourceName={sourceName}
                      sourceType={sourceType}
                    />
                  );
                case "CICBIA":
                  return (
                    <ListeDebitsCIC
                      debitsTable={debitsTable}
                      sourceName={sourceName}
                      sourceType={sourceType}
                    />
                  );
                default:
                  return null;
              }
            })()}
          </div>
        ) : null}
      </div>

      <div className="liste-credits">
        {sourceName && sourceType && creditsTable ? (
          <div className="liste-content">
            {(() => {
              switch (sourceType) {
                case "SGEP":
                  return (
                    <ListeCreditsSG
                      creditsTable={creditsTable}
                      sourceName={sourceName}
                      sourceType={sourceType}
                    />
                  );
                case "SGJMS":
                  return (
                    <ListeCreditsSG
                      creditsTable={creditsTable}
                      sourceName={sourceName}
                      sourceType={sourceType}
                    />
                  );
                case "BPEP":
                  return (
                    <ListeCreditsBPEP
                      creditsTable={creditsTable}
                      sourceName={sourceName}
                      sourceType={sourceType}
                    />
                  );
                case "LCLJMS":
                  return (
                    <ListeCreditsLCL
                      creditsTable={creditsTable}
                      sourceName={sourceName}
                      sourceType={sourceType}
                    />
                  );
                case "CICBIA":
                  return (
                    <ListeCreditsCIC
                      creditsTable={creditsTable}
                      sourceName={sourceName}
                      sourceType={sourceType}
                    />
                  );
                default:
                  return null;
              }
            })()}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UploadSource;
