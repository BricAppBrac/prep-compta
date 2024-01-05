import React, { useState } from "react";
import Papa from "papaparse";

const ListeDebitsCIC = ({ debitsTable, sourceName, sourceType }) => {
  console.log("ListeDebitsCIC");
  console.log("debitsTable");
  console.log(debitsTable);
  let compteOptions = [
    "401000",
    "401001",
    "401CED",
    "401EXC",
    "401EXP",
    "401JMS",
    "401LEG",
    "401PLA",
    "401PPC",
    "401RIC",
    "401SID",
    "408100",
    "4114FG",
    "411ABM",
    "411ATI",
    "411BON",
    "411BOU",
    "411BTB",
    "411CAP",
    "411CES",
    "411CHA",
    "411CI2",
    "411CIT",
    "411COG",
    "411DAB",
    "411DIF",
    "411ESP",
    "411FOL",
    "411FON",
    "411FRA",
    "411GAG",
    "411GON",
    "411JUL",
    "411JUN",
    "411JUP",
    "411LCB",
    "411MUL",
    "411MUS",
    "411MYH",
    "411PAR",
    "411PIC",
    "411PLU",
    "411POR",
    "411PRI",
    "411RLM",
    "411ROS",
    "411SAG",
    "411SAL",
    "411SQA",
    "411SQV",
    "411TAR",
    "416000",
    "419800",
    "421001",
    "428610",
    "431000",
    "442100",
    "445620",
    "445660",
    "445661",
    "445670",
    "445710",
    "445720",
    "445771",
    "455003",
    "455004",
    "455005",
    "455006",
    "455100",
    "486000",
    "491000",
    "607100",
    "611010",
    "611030",
    "611035",
    "613200",
    "613510",
    "613520",
    "613530",
    "613531",
    "613532",
    "615200",
    "615600",
    "615610",
    "616000",
    "616100",
    "616300",
    "616310",
    "616400",
    "621100",
    "622620",
    "622700",
    "623200",
    "623300",
    "623400",
    "623450",
    "623500",
    "625100",
    "625200",
    "625700",
    "626100",
    "627100",
    "627105",
    "627110",
    "628100",
    "628200",
    "633500",
    "641000",
    "641010",
    "645000",
    "647500",
    "648000",
    "648110",
    "648200",
    "658000",
    "661110",
    "671000",
    "671200",
  ];

  const [messageInfo, setMessageInfo] = useState("");

  const [prepCsvArray, setPrepCsvArray] = useState([]);

  // VALEURS SELECTIONNEES OU SAISIES
  const [compteSelectedArray, setCompteSelectedArray] = useState(
    debitsTable.map(() => null)
  );
  const [refSelectedArray, setRefSelectedArray] = useState(
    debitsTable.map(() => null)
  );
  const [libelleSelectedArray, setLibelleSelectedArray] = useState(
    debitsTable.map(() => null)
  );

  // Gestion des Autre : sélections de l'option Autre
  const [isAutreCompteSelectedArray, setIsAutreCompteSelectedArray] = useState(
    debitsTable.map(() => false)
  );
  const [isAutreRefSelectedArray, setIsAutreRefSelectedArray] = useState(
    debitsTable.map(() => false)
  );
  const [isAutreLibelleSelectedArray, setIsAutreLibelleSelectedArray] =
    useState(debitsTable.map(() => false));

  // Gestion des Autre : Renseignement de la zone correspondant à Autre
  const [isAutreCompteRenseigneArray, setIsAutreCompteRenseigneArray] =
    useState(debitsTable.map(() => false));
  const [isAutreRefRenseigneArray, setIsAutreRefRenseigneArray] = useState(
    debitsTable.map(() => false)
  );
  const [isAutreLibelleRenseigneArray, setIsAutreLibelleRenseigneArray] =
    useState(debitsTable.map(() => false));

  // Gestion de la sélection des options pour chaque ligne
  const [isOptionCptSelectedArray, setIsOptionCptSelectedArray] = useState(
    debitsTable.map(() => false)
  );
  const [isOptionRefSelectedArray, setIsOptionRefSelectedArray] = useState(
    debitsTable.map(() => false)
  );
  const [isOptionLibSelectedArray, setIsOptionLibSelectedArray] = useState(
    debitsTable.map(() => false)
  );

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit");
    // Vérifier que toutes les données ont été sélectionnées ou saisies avant d'accepter génération du fichier csv

    const allIndicatorsAreOK = debitsTable.every((row, index) => {
      return (
        // Compte sélectionné ou saisi
        ((isOptionCptSelectedArray[index] &&
          !isAutreCompteSelectedArray[index]) ||
          (isOptionCptSelectedArray[index] &&
            isAutreCompteSelectedArray[index] &&
            isAutreCompteRenseigneArray[index])) &&
        // Ref sélectionnée ou saisie
        ((isOptionRefSelectedArray[index] && !isAutreRefSelectedArray[index]) ||
          (isOptionRefSelectedArray[index] &&
            isAutreRefSelectedArray[index] &&
            isAutreRefRenseigneArray[index])) &&
        // Lib sélectionné ou saisi
        ((isOptionLibSelectedArray[index] &&
          !isAutreLibelleSelectedArray[index]) ||
          (isOptionLibSelectedArray[index] &&
            isAutreLibelleSelectedArray[index] &&
            isAutreLibelleRenseigneArray[index]))
      );
    });

    if (allIndicatorsAreOK) {
      setMessageInfo("");
      handlePrepCsv();
    } else {
      setMessageInfo("⚠️ Valeurs manquantes");
    }
  };

  const handlePrepCsv = () => {
    console.log("handlePrepCsv");

    // Construire le tableau prepCsvArray en utilisant les données nécessaires
    const newPrepCsvArray = debitsTable.flatMap((row, index) => {
      // Première ligne pour chaque itération
      const firstLine = [
        row[0], // Date
        "OD",
        compteSelectedArray[index],
        refSelectedArray[index],
        libelleSelectedArray[index],
        row[1] * -1, // Changer le signe du montant
      ];

      // Deuxième ligne pour chaque itération
      const secondLine = [
        row[0], // Date
        "OD",
        "512000", // Valeur fixe
        refSelectedArray[index],
        libelleSelectedArray[index],
        "",
        row[1] * -1, // Changer le signe du montant
      ];

      // Retourner un tableau contenant les deux lignes pour chaque itération
      return [firstLine, secondLine];
    });

    setPrepCsvArray(newPrepCsvArray);

    console.log("prepCsvArray");
    console.log(prepCsvArray);

    // Générer le fichier CSV
    generateCsv(newPrepCsvArray);
  };
  const generateCsv = (data) => {
    const csv = Papa.unparse(data);
    const csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const csvURL = window.URL.createObjectURL(csvData);

    const fileName = `PrepComptaDebits${sourceName}.csv`;

    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", fileName);
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  };

  const handleCompte = (compteSelected, index) => {
    console.log("handleCompte");
    console.log("compteSelected");
    console.log(compteSelected);
    // Stockage de la valeur sélectionnée
    setCompteSelectedArray((prevState) => {
      const newState = [...prevState];
      newState[index] = compteSelected;
      return newState;
    });

    // Indicateur select effectué
    setIsOptionCptSelectedArray((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });

    // Indicateur zone autre non saisie
    setIsAutreCompteRenseigneArray((prevState) => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });

    if (compteSelected !== "Autre") {
      console.log(`compteSelected !== "Autre"`);
      setIsAutreCompteSelectedArray((prevState) => {
        const newState = [...prevState];
        newState[index] = false;
        return newState;
      });
    }
    // Activer le champ de texte si "Autre" est sélectionné
    // setIsAutreCompteSelected(compteSelected === "Autre");
    if (compteSelected === "Autre") {
      console.log(`compteSelected === "Autre"`);
      setIsAutreCompteSelectedArray((prevState) => {
        const newState = [...prevState];
        newState[index] = true;
        return newState;
      });
    }
  };

  const handleRef = (refSelected, index) => {
    console.log("handleRef");
    // Stockage de la valeur sélectionnée
    setRefSelectedArray((prevState) => {
      const newState = [...prevState];
      newState[index] = refSelected;
      return newState;
    });

    // Indicateur select effectué
    setIsOptionRefSelectedArray((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });

    if (refSelected !== "Autre") {
      setIsAutreRefSelectedArray((prevState) => {
        const newState = [...prevState];
        newState[index] = false;
        return newState;
      });
      setIsAutreRefRenseigneArray((prevState) => {
        const newState = [...prevState];
        newState[index] = false;
        return newState;
      });
    }
    // Activer le champ de texte si "Autre" est sélectionné
    // setIsAutreRefSelected(refSelected === "Autre");
    if (refSelected === "Autre") {
      setIsAutreRefSelectedArray((prevState) => {
        const newState = [...prevState];
        newState[index] = true;
        return newState;
      });
    }
  };

  const handleLibelle = (libelleSelected, index) => {
    console.log("handleLibelle");
    // Stockage de la valeur sélectionnée
    setLibelleSelectedArray((prevState) => {
      const newState = [...prevState];
      newState[index] = libelleSelected;
      return newState;
    });

    // Indicateur select effectué
    setIsOptionLibSelectedArray((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });

    // Si sélection différente de Autre
    // Indicateur Option Selected TRUE
    // Indicateur Zone Autre renseignée FALSE

    if (libelleSelected !== "Autre") {
      setIsAutreLibelleSelectedArray((prevState) => {
        const newState = [...prevState];
        newState[index] = false;
        return newState;
      });
      setIsAutreLibelleRenseigneArray((prevState) => {
        const newState = [...prevState];
        newState[index] = false;
        return newState;
      });
    }
    // Activer le champ de texte si "Autre" est sélectionné
    // setIsAutreLibelleSelected(libelleSelected === "Autre");
    if (libelleSelected === "Autre") {
      setIsAutreLibelleSelectedArray((prevState) => {
        const newState = [...prevState];
        newState[index] = true;
        return newState;
      });
    }
  };

  const handleAutreCompte = (compteInput, index) => {
    console.log("handleAutreCompte :" + compteInput);
    // Stockage de la valeur saisie
    setCompteSelectedArray((prevState) => {
      const newState = [...prevState];
      newState[index] = compteInput;
      return newState;
    });
    // Indicateur zone autre saisie
    setIsAutreCompteRenseigneArray((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });

    if (compteInput === "" || compteInput === null) {
      setIsAutreCompteRenseigneArray((prevState) => {
        const newState = [...prevState];
        newState[index] = false;
        return newState;
      });
    }
  };

  const handleAutreRef = (refInput, index) => {
    console.log("handleAutreRef :" + refInput);
    // Stockage de la valeur saisie
    setRefSelectedArray((prevState) => {
      const newState = [...prevState];
      newState[index] = refInput;
      return newState;
    });
    // Indicateur zone autre saisie
    setIsAutreRefRenseigneArray((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });

    if (refInput === "" || refInput === null) {
      setIsAutreRefRenseigneArray((prevState) => {
        const newState = [...prevState];
        newState[index] = false;
        return newState;
      });
    }
  };

  const handleAutreLibelle = (libelleInput, index) => {
    console.log("handleAutreLibelle :");
    console.log(libelleInput);
    // Stockage de la valeur saisie
    setLibelleSelectedArray((prevState) => {
      const newState = [...prevState];
      newState[index] = libelleInput;
      return newState;
    });
    // Indicateur zone autre saisie
    setIsAutreLibelleRenseigneArray((prevState) => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });

    if (libelleInput === "" || libelleInput === null) {
      setIsAutreLibelleRenseigneArray((prevState) => {
        const newState = [...prevState];
        newState[index] = false;
        return newState;
      });
    }
  };

  return (
    <div>
      <h2>Liste des Débits</h2>
      <form onSubmit={handleSubmit}>
        {debitsTable.map((row, index) => (
          <div key={index} className="debit-row">
            <h4>
              ************************************************************************************************************************
            </h4>
            <div className="row-title">
              <h4>Date: {row[0]}</h4>
              <h4>Montant: {row[1]} €</h4>
            </div>
            <div className="row-select">
              <div className="row-libelle">
                <label>
                  Libellé :
                  <select
                    name={`libelle-${index}`}
                    defaultValue=""
                    onChange={(e) => {
                      handleLibelle(e.target.value, index);
                    }}
                    className={
                      (isOptionLibSelectedArray[index] &&
                        !isAutreLibelleSelectedArray[index]) ||
                      (isOptionLibSelectedArray[index] &&
                        isAutreLibelleSelectedArray[index] &&
                        isAutreLibelleRenseigneArray[index])
                        ? "option-selected"
                        : ""
                    }
                  >
                    <option value="" disabled>
                      Choisissez un Libellé
                    </option>
                    <option value={row[2]}>{row[2]}</option>
                    <option value="Autre">Autre Libellé</option>
                  </select>
                </label>
                {isAutreLibelleSelectedArray[index] && (
                  <input
                    type="text"
                    name="autreLibelle"
                    id="autreLibelle"
                    placeholder="Libelle"
                    autoComplete="off"
                    onChange={(e) => {
                      handleAutreLibelle(e.target.value, index);
                    }}
                    className={
                      isAutreLibelleRenseigneArray[index] === true
                        ? "option-selected"
                        : ""
                    }
                  />
                )}
              </div>
              <div className="row-ref">
                <label>
                  Ref :
                  <select
                    name={`ref-${index}`}
                    defaultValue=""
                    onChange={(e) => {
                      handleRef(e.target.value, index);
                    }}
                    className={
                      (isOptionRefSelectedArray[index] &&
                        !isAutreRefSelectedArray[index]) ||
                      (isOptionRefSelectedArray[index] &&
                        isAutreRefSelectedArray[index] &&
                        isAutreRefRenseigneArray[index])
                        ? "option-selected"
                        : ""
                    }
                  >
                    <option value="" disabled>
                      Choisissez une Référence
                    </option>
                    <option value={row[3]}>{row[3]}</option>
                    <option value="Autre">Autre Ref</option>
                  </select>
                </label>
                {isAutreRefSelectedArray[index] && (
                  <input
                    type="text"
                    name="autreRef"
                    id="autreRef"
                    placeholder="Ref"
                    autoComplete="off"
                    onChange={(e) => {
                      handleAutreRef(e.target.value, index);
                    }}
                    className={
                      isAutreRefRenseigneArray[index] ? "option-selected" : ""
                    }
                  />
                )}
              </div>
              <div className="row-compte">
                <label>
                  Compte :
                  <select
                    name={`compte-${index}`}
                    defaultValue=""
                    onChange={(e) => {
                      handleCompte(e.target.value, index);
                    }}
                    className={
                      (isOptionCptSelectedArray[index] &&
                        !isAutreCompteSelectedArray[index]) ||
                      (isOptionCptSelectedArray[index] &&
                        isAutreCompteSelectedArray[index] &&
                        isAutreCompteRenseigneArray[index])
                        ? "option-selected"
                        : ""
                    }
                  >
                    <option value="" disabled>
                      Choisissez un compte
                    </option>
                    {compteOptions.map((compte, i) => (
                      <option key={i} value={compte}>
                        {compte}
                      </option>
                    ))}
                    <option value="Autre">Autre Compte</option>
                  </select>
                </label>
                {isAutreCompteSelectedArray[index] && (
                  <input
                    type="text"
                    name="autreCompte"
                    id="autreCompte"
                    placeholder="Nom du compte"
                    autoComplete="off"
                    onChange={(e) => {
                      handleAutreCompte(e.target.value, index);
                    }}
                    className={
                      isAutreCompteRenseigneArray[index]
                        ? "option-selected"
                        : ""
                    }
                  />
                )}
              </div>
            </div>
          </div>
        ))}
        <p>{messageInfo ? messageInfo : null}</p>
        <div className="form-submit">
          <h2>***</h2>
          <h2>Générer le fichier .CSV des DEBITS</h2>
          <button type="submit">Soumettre</button>
        </div>
      </form>
    </div>
  );
};

export default ListeDebitsCIC;
