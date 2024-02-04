import React, { useState } from "react";
import Papa from "papaparse";

const ListeCreditsLCL = ({ creditsTable, sourceName, sourceType }) => {
  console.log("ListeCreditsLCL");
  console.log("creditsTable");
  console.log(creditsTable);
  let compteOptions = [
    "401000",
    "401001",
    "421001",
    "425000",
    "431000",
    "411EXP",
    "411077",
    "4114FG",
    "411A3P",
    "411ABM",
    "411AEC",
    "411AMB",
    "411APP",
    "411ATI",
    "411AVA",
    "411BAL",
    "411BON",
    "411BOU",
    "411BTB",
    "411CAP",
    "411CEN",
    "411CES",
    "411CHA",
    "411CHO",
    "411CI2",
    "411CIT",
    "411COG",
    "411CON",
    "411DAB",
    "411DIF",
    "411ESP",
    "411EVO",
    "411EXC",
    "411FOL",
    "411FON",
    "411FRA",
    "411GAG",
    "411GES",
    "411GON",
    "411GOT",
    "411GRA",
    "411HAU",
    "411IML",
    "411IMM",
    "411JUL",
    "411JUN",
    "411JUP",
    "411KOR",
    "411LCB",
    "411MBS",
    "411MOB",
    "411MUL",
    "411MUS",
    "411MYH",
    "411NEX",
    "411ORP",
    "411PAR",
    "411PDL",
    "411PER",
    "411PIC",
    "411PLU",
    "411POR",
    "411PRE",
    "411PRI",
    "411QUA",
    "411RCI",
    "411REM",
    "411REP",
    "411RLM",
    "411ROM",
    "411ROS",
    "411SAG",
    "411SAL",
    "411SFI",
    "411SIM",
    "411SQA",
    "411SQV",
    "411TAR",
    "411WAT",
    "411WEL",
    "401000",
    "411000",
    "411EXP",
    "421000",
    "428200",
    "431000",
    "438601",
    "444000",
    "445510",
    "445620",
    "445660",
    "445670",
    "445710",
    "448700",
    "455000",
    "455170",
    "455200",
    "455300",
    "455500",
    "455650",
    "467000",
    "467022",
    "467100",
    "467130",
    "468700",
    "471000",
    "508000",
    "508100",
    "512000",
    "512100",
    "512120",
    "512130",
    "580000",
    "606140",
    "606300",
    "606400",
    "613210",
    "615520",
    "616000",
    "618000",
    "622100",
    "622600",
    "622700",
    "623800",
    "625100",
    "625700",
    "626000",
    "626100",
    "627100",
    "628000",
    "633300",
    "635110",
    "635140",
    "641000",
    "641150",
    "641400",
    "645100",
    "648000",
    "658000",
    "658100",
    "671000",
    "675000",
    "675600",
    "681100",
    "681120",
    "695100",
    "706020",
    "706100",
    "706200",
    "706300",
    "706500",
    "706800",
    "758000",
    "761000",
    "768000",
    "775000",
    "775600",
    "791000",
  ];

  const [messageInfo, setMessageInfo] = useState("");

  const [prepCsvArray, setPrepCsvArray] = useState([]);

  // VALEURS SELECTIONNEES OU SAISIES
  const [compteSelectedArray, setCompteSelectedArray] = useState(
    creditsTable.map(() => null)
  );
  const [refSelectedArray, setRefSelectedArray] = useState(
    creditsTable.map(() => null)
  );
  const [libelleSelectedArray, setLibelleSelectedArray] = useState(
    creditsTable.map(() => null)
  );

  // Gestion des Autre : sélections de l'option Autre
  const [isAutreCompteSelectedArray, setIsAutreCompteSelectedArray] = useState(
    creditsTable.map(() => false)
  );
  const [isAutreRefSelectedArray, setIsAutreRefSelectedArray] = useState(
    creditsTable.map(() => false)
  );
  const [isAutreLibelleSelectedArray, setIsAutreLibelleSelectedArray] =
    useState(creditsTable.map(() => false));

  // Gestion des Autre : Renseignement de la zone correspondant à Autre
  const [isAutreCompteRenseigneArray, setIsAutreCompteRenseigneArray] =
    useState(creditsTable.map(() => false));
  const [isAutreRefRenseigneArray, setIsAutreRefRenseigneArray] = useState(
    creditsTable.map(() => false)
  );
  const [isAutreLibelleRenseigneArray, setIsAutreLibelleRenseigneArray] =
    useState(creditsTable.map(() => false));

  // Gestion de la sélection des options pour chaque ligne
  const [isOptionCptSelectedArray, setIsOptionCptSelectedArray] = useState(
    creditsTable.map(() => false)
  );
  const [isOptionRefSelectedArray, setIsOptionRefSelectedArray] = useState(
    creditsTable.map(() => false)
  );
  const [isOptionLibSelectedArray, setIsOptionLibSelectedArray] = useState(
    creditsTable.map(() => false)
  );

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit");
    // Vérifier que toutes les données ont été sélectionnées ou saisies avant d'accepter génération du fichier csv

    const allIndicatorsAreOK = creditsTable.every((row, index) => {
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
    const newPrepCsvArray = creditsTable.flatMap((row, index) => {
      // Première ligne pour chaque itération
      const firstLine = [
        row[0], // Date
        "OD",
        compteSelectedArray[index],
        refSelectedArray[index] ? refSelectedArray[index] : "LCL",
        libelleSelectedArray[index],
        "",
        row[1], // Montant
      ];

      // Deuxième ligne pour chaque itération
      const secondLine = [
        row[0], // Date
        "OD",
        "512000", // Valeur fixe
        refSelectedArray[index] ? refSelectedArray[index] : "LCL",
        libelleSelectedArray[index],
        row[1], // Montant
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

    const fileName = `PrepComptaCredits${sourceName}.csv`;

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

    // Test pour initialisation du compte
    if (
      refSelected.toLowerCase().includes("zen") ||
      refSelected.toLowerCase().includes("asp") ||
      refSelected.toLowerCase().includes("prixtel") ||
      refSelected.toLowerCase().includes("sgsante") ||
      refSelected.toLowerCase().includes("renouvellement") ||
      refSelected.toLowerCase().includes("urssaf") ||
      refSelected.toLowerCase().includes("bouygues") ||
      refSelected.toLowerCase().includes("cmut cpte") ||
      refSelected.toLowerCase().includes("salaire") ||
      refSelected.toLowerCase().includes("dgfip") ||
      refSelected.toLowerCase().includes("jms sg") ||
      refSelected.toLowerCase().includes("rem") ||
      refSelected.toLowerCase().includes("interets") ||
      refSelected.toLowerCase().includes("carte")
    ) {
      if (
        refSelected.toLowerCase().includes("asp") ||
        refSelected.toLowerCase().includes("sgsante") ||
        refSelected.toLowerCase().includes("URSSAF".toLowerCase())
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "641400";
          return newState;
        });
      }

      /////////

      if (
        refSelected.toLowerCase().includes("prixtel") ||
        refSelected.toLowerCase().includes("bouygues")
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "626100";
          return newState;
        });
      }

      //////

      if (
        refSelected.toLowerCase().includes("cmut cpte") ||
        refSelected.toLowerCase().includes("rem")
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "455000";
          return newState;
        });
      }

      //////

      if (refSelected.toLowerCase().includes("zen")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "627100";
          return newState;
        });
      }

      //////

      if (refSelected.toLowerCase().includes("renouvellement")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "508000";
          return newState;
        });
      }

      //////

      if (refSelected.toLowerCase().includes("salaire")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "421000";
          return newState;
        });
      }

      //////
      if (refSelected.toLowerCase().includes("dgfip")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "445510";
          return newState;
        });
      }

      //////

      if (refSelected.toLowerCase().includes("jms sg")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "580000";
          return newState;
        });
      }

      //////
      if (refSelected.toLowerCase().includes("interets")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "768000";
          return newState;
        });
      }

      //////

      if (refSelected.toLowerCase().includes("carte")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "401CBT";
          return newState;
        });
      }

      //////

      // Indicateur select effectué
      setIsOptionCptSelectedArray((prevState) => {
        const newState = [...prevState];
        newState[index] = true;
        return newState;
      });
    }

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

    // Test pour initialisation du compte
    if (
      libelleSelected.toLowerCase().includes("zen") ||
      libelleSelected.toLowerCase().includes("asp") ||
      libelleSelected.toLowerCase().includes("prixtel") ||
      libelleSelected.toLowerCase().includes("sgsante") ||
      libelleSelected.toLowerCase().includes("renouvellement") ||
      libelleSelected.toLowerCase().includes("urssaf") ||
      libelleSelected.toLowerCase().includes("bouygues") ||
      libelleSelected.toLowerCase().includes("cmut cpte") ||
      libelleSelected.toLowerCase().includes("salaire") ||
      libelleSelected.toLowerCase().includes("dgfip") ||
      libelleSelected.toLowerCase().includes("jms sg") ||
      libelleSelected.toLowerCase().includes("rem") ||
      libelleSelected.toLowerCase().includes("interets") ||
      libelleSelected.toLowerCase().includes("carte")
    ) {
      if (
        libelleSelected.toLowerCase().includes("asp") ||
        libelleSelected.toLowerCase().includes("sgsante") ||
        libelleSelected.toLowerCase().includes("URSSAF".toLowerCase())
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "641400";
          return newState;
        });
      }

      /////////

      if (
        libelleSelected.toLowerCase().includes("prixtel") ||
        libelleSelected.toLowerCase().includes("bouygues")
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "626100";
          return newState;
        });
      }

      //////

      if (
        libelleSelected.toLowerCase().includes("cmut cpte") ||
        libelleSelected.toLowerCase().includes("rem")
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "455000";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("zen")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "627100";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("renouvellement")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "508000";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("salaire")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "421000";
          return newState;
        });
      }

      //////
      if (libelleSelected.toLowerCase().includes("dgfip")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "445510";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("jms sg")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "580000";
          return newState;
        });
      }

      //////
      if (libelleSelected.toLowerCase().includes("interets")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "768000";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("carte")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "401CBT";
          return newState;
        });
      }

      //////

      // Indicateur select effectué
      setIsOptionCptSelectedArray((prevState) => {
        const newState = [...prevState];
        newState[index] = true;
        return newState;
      });
    }

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
      <h2>Liste des Crédits</h2>
      <form onSubmit={handleSubmit}>
        {creditsTable.map((row, index) => (
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
          <h2>Générer le fichier .CSV des CREDITS</h2>
          <button type="submit">Soumettre</button>
        </div>
      </form>
    </div>
  );
};

export default ListeCreditsLCL;
