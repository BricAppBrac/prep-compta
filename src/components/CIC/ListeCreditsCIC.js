import React, { useState } from "react";
import Papa from "papaparse";

const ListeCreditsCIC = ({ creditsTable, sourceName, sourceType }) => {
  console.log("ListeCreditsCIC");
  console.log("creditsTable");
  console.log(creditsTable);
  let compteOptions = [
    "101300",
    "101300",
    "106100",
    "119000",
    "120000",
    "208100",
    "218300",
    "281830",
    "310000",
    "401ACT",
    "401ADA",
    "401Adm",
    "401Ael",
    "401Afl",
    "401API",
    "401aus",
    "401AUT",
    "401Avo",
    "401BOE",
    "401BOT",
    "401BOU",
    "401Bri",
    "401BTC",
    "401CAR",
    "401CAS",
    "401CHA",
    "401Coo",
    "401COO",
    "401COT",
    "401CRE",
    "401CRO",
    "401Ctb",
    "401CUL",
    "401DAU",
    "401DEC",
    "401DEF",
    "401DHL",
    "401DIV",
    "401DPK",
    "401DVV",
    "401EUR",
    "401Fed",
    "401FEU",
    "401GAI",
    "401GAR",
    "401GEB",
    "401GOJ",
    "401GOM",
    "401GRE",
    "401HAL",
    "401HAV",
    "401HOL",
    "401HOT",
    "401Hum",
    "401IMP",
    "401INT",
    "401Jea",
    "401JVC",
    "401Kd",
    "401KD0",
    "401Kuh",
    "401LAB",
    "401Lar",
    "401LAR",
    "401LAV",
    "401LER",
    "401LNS",
    "401Lyo",
    "401MAG",
    "401Mai",
    "401MAI",
    "401MDA",
    "401MRB",
    "401MUH",
    "401MUR",
    "401OFF",
    "401Out",
    "401OUT",
    "401OVA",
    "401PAR",
    "401Pau",
    "401PEA",
    "401PER",
    "401PGD",
    "401POS",
    "401Pra",
    "401PRA",
    "401REF",
    "401REM",
    "401REN",
    "401RES",
    "401RET",
    "401ROG",
    "401SEC",
    "401SER",
    "401SFR",
    "401Sis",
    "401SIS",
    "401SIT",
    "401SNC",
    "401SOL",
    "401SUP",
    "401TAX",
    "401TEC",
    "401Tri",
    "401TSA",
    "401UNI",
    "401UPS",
    "401VER",
    "401VUI",
    "401WEI",
    "401WID",
    "401WIL",
    "401ZAR",
    "408010",
    "408040",
    "408064",
    "408100",
    "408152",
    "408222",
    "408226",
    "408228",
    "408242",
    "408251",
    "411ANN",
    "411ATT",
    "411DEM",
    "411GAR",
    "411Maj",
    "411Mar",
    "411MIL",
    "411Mul",
    "411PAS",
    "411PAT",
    "411PHA",
    "411VEE",
    "411Vel",
    "411Whi",
    "411ZAH",
    "418100",
    "419800",
    "444000",
    "445200",
    "445660",
    "445669",
    "445670",
    "445710",
    "445831",
    "445860",
    "448635",
    "455100",
    "455101",
    "455200",
    "467300",
    "471000",
    "472000",
    "478999",
    "512001",
    "512002",
    "512030",
    "512100",
    "512103",
    "512104",
    "512105",
    "519000",
    "580000",
    "601000",
    "603100",
    "604000",
    "606300",
    "606400",
    "613200",
    "613520",
    "615200",
    "616000",
    "622200",
    "622600",
    "622610",
    "622700",
    "622800",
    "623000",
    "623001",
    "623400",
    "624200",
    "625100",
    "625300",
    "626000",
    "626100",
    "627800",
    "635110",
    "641300",
    "651600",
    "658000",
    "671200",
    "671800",
    "675000",
    "678800",
    "681120",
    "695000",
    "701000",
    "701010",
    "706000",
    "758000",
    "771800",
    "CDEMAJ",
    "CMAJOI",
    "CMARYO",
    "CMULRO",
    "CVELAA",
    "CWHITC",
    "CZAHID",
    "FADAMA",
    "FADMB0",
    "FAFLYC",
    "FAUST0",
    "FAVOCA",
    "FBOUYG",
    "FBRIDG",
    "FCOOK0",
    "FCTB00",
    "FDIVER",
    "FDPK00",
    "FFED00",
    "FHUM00",
    "FJEAN0",
    "FKD000",
    "FKUHN0",
    "FLAB00",
    "FLARS0",
    "FMAGNE",
    "FMAIS0",
    "FOUTIL",
    "FPAUL0",
    "FPRAUG",
    "FSIS00",
    "FTRIAD",
    "FVERNE",
    "FWILD0",
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
        refSelectedArray[index],
        libelleSelectedArray[index],
        "",
        row[1], // Montant
      ];

      // Deuxième ligne pour chaque itération
      const secondLine = [
        row[0], // Date
        "OD",
        "512000", // Valeur fixe
        refSelectedArray[index],
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

    /////////////*** */
    // Test pour initialisation du compte
    if (
      refSelected.toLowerCase().includes("forestiere") ||
      refSelected.toLowerCase().includes("velaa") ||
      refSelected.toLowerCase().includes("vir") ||
      refSelected.toLowerCase().includes("biatech") ||
      refSelected.toLowerCase().includes("sci") ||
      refSelected.toLowerCase().includes("societe civile immobiliere")
    ) {
      if (refSelected.toLowerCase().includes("forestiere")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411PHA";
          return newState;
        });
      }

      //////

      //////
      if (refSelected.toLowerCase().includes("velaa")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411VEE";
          return newState;
        });
      }
      //////
      //////
      if (refSelected.toLowerCase().includes("vir")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "471000";
          return newState;
        });
      }
      //////
      if (refSelected.toLowerCase().includes("biatech")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "580000";
          return newState;
        });
      }
      //////
      if (
        refSelected.toLowerCase().includes("sci") ||
        refSelected.toLowerCase().includes("societe civile immobiliere")
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "455100";
          return newState;
        });
      }

      // Indicateur select effectué
      setIsOptionCptSelectedArray((prevState) => {
        const newState = [...prevState];
        newState[index] = true;
        return newState;
      });
    }

    /////////**** */

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

    /////////////*** */
    // Test pour initialisation du compte
    if (
      libelleSelected.toLowerCase().includes("forestiere") ||
      libelleSelected.toLowerCase().includes("velaa") ||
      libelleSelected.toLowerCase().includes("vir") ||
      libelleSelected.toLowerCase().includes("biatech") ||
      libelleSelected.toLowerCase().includes("sci") ||
      libelleSelected.toLowerCase().includes("societe civile immobiliere")
    ) {
      if (libelleSelected.toLowerCase().includes("forestiere")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411PHA";
          return newState;
        });
      }

      //////

      //////
      if (libelleSelected.toLowerCase().includes("velaa")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411VEE";
          return newState;
        });
      }
      //////
      //////
      if (libelleSelected.toLowerCase().includes("vir")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "471000";
          return newState;
        });
      }
      //////
      if (libelleSelected.toLowerCase().includes("biatech")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "580000";
          return newState;
        });
      }
      //////
      if (
        libelleSelected.toLowerCase().includes("sci") ||
        libelleSelected.toLowerCase().includes("societe civile immobiliere")
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "455100";
          return newState;
        });
      }

      // Indicateur select effectué
      setIsOptionCptSelectedArray((prevState) => {
        const newState = [...prevState];
        newState[index] = true;
        return newState;
      });
    }

    /////////**** */

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
                    // defaultValue=""
                    value={compteSelectedArray[index]}
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

export default ListeCreditsCIC;
