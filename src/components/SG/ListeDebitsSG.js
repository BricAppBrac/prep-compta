import React, { useEffect, useState } from "react";
import Papa from "papaparse";

const ListeDebits = ({ debitsTable, sourceName, sourceType }) => {
  console.log("ListeDebits");
  console.log("debitsTable");
  console.log(debitsTable);
  let compteOptionsSGEP = [
    "164100",
    "164200",
    "164220",
    "401000",
    "401001",
    "401CED",
    "401EXC",
    "401EXP",
    "401JMS",
    "401LCR",
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
  let compteOptionsSGJMS = [
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

  let compteOptions;

  switch (sourceType) {
    case "SGEP":
      compteOptions = compteOptionsSGEP;
      break;
    case "SGJMS":
      compteOptions = compteOptionsSGJMS;
      break;

    default:
      compteOptions = [];
      break;
  }

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
        sourceType === "SGEP" ? "512000" : "512100",
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

    // Test pour initialisation du compte SGEP
    if (
      (refSelected.toLowerCase().includes("PROBTP".toLowerCase()) ||
        refSelected.toLowerCase().includes("CIBTP".toLowerCase()) ||
        refSelected.toLowerCase().includes("URSSAF".toLowerCase()) ||
        refSelected.toLowerCase().includes("DGFIP".toLowerCase()) ||
        refSelected.toLowerCase().includes("ABONNT".toLowerCase()) ||
        refSelected.toLowerCase().includes("CION MOUVEMENT".toLowerCase()) ||
        refSelected.toLowerCase().includes("BPIFRANCE".toLowerCase()) ||
        refSelected.toLowerCase().includes("MMA IARD".toLowerCase()) ||
        refSelected.toLowerCase().includes("JAZZPRO".toLowerCase()) ||
        refSelected.includes("221168100944") ||
        refSelected.includes("222084100944") ||
        refSelected.toLowerCase().includes("salaire".toLowerCase()) ||
        refSelected.toLowerCase().includes("TETRIS".toLowerCase()) ||
        refSelected.toLowerCase().includes("AGIPI".toLowerCase()) ||
        refSelected.toLowerCase().includes("blicko lyon".toLowerCase()) ||
        refSelected.toLowerCase().includes("allart".toLowerCase()) ||
        refSelected.toLowerCase().includes("gharbit".toLowerCase()) ||
        refSelected.toLowerCase().includes("remise cb") ||
        refSelected.toLowerCase().includes("LCR".toLowerCase())) &&
      sourceType === "SGEP"
    ) {
      console.log("ref SGEP");

      if (refSelected.toLowerCase().includes("LCR".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "401LCR";
          return newState;
        });
      }

      //////

      if (
        refSelected.toLowerCase().includes("PROBTP".toLowerCase()) ||
        refSelected.toLowerCase().includes("CIBTP".toLowerCase()) ||
        refSelected.toLowerCase().includes("URSSAF".toLowerCase()) ||
        refSelected.toLowerCase().includes("DGFIP".toLowerCase())
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "431000";
          return newState;
        });
      }

      /////////

      if (
        refSelected.toLowerCase().includes("ABONNT".toLowerCase()) ||
        refSelected.toLowerCase().includes("CION MOUVEMENT".toLowerCase())
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "627100";
          return newState;
        });
      }

      //////

      if (
        refSelected.toLowerCase().includes("allart".toLowerCase()) ||
        refSelected.toLowerCase().includes("gharbit".toLowerCase())
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "401001";
          return newState;
        });
      }

      //////

      if (refSelected.toLowerCase().includes("BPIFRANCE".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "661110";
          return newState;
        });
      }

      //////

      if (refSelected.toLowerCase().includes("MMA IARD".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "616000";
          return newState;
        });
      }

      //////

      if (refSelected.toLowerCase().includes("JAZZPRO".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "627100";
          return newState;
        });
      }

      //////
      if (refSelected.includes("221168100944")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "164100";
          return newState;
        });
      }

      //////
      if (refSelected.includes("222084100944")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "164200";
          return newState;
        });
      }

      //////
      if (refSelected.toLowerCase().includes("salaire".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "421001";
          return newState;
        });
      }

      //////

      if (refSelected.toLowerCase().includes("TETRIS".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "616100";
          return newState;
        });
      }

      //////
      if (refSelected.toLowerCase().includes("AGIPI".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "616400";
          return newState;
        });
      }

      //////

      if (refSelected.toLowerCase().includes("blicko lyon".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "455100";
          return newState;
        });
      }

      //////
      if (refSelected.toLowerCase().includes("remise cb")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411PAR";
          return newState;
        });
      }

      //////
      if (
        refSelected
          .toLowerCase()
          .includes("TOTALENERGIES DEVELOP".toLowerCase())
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "164220";
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

    // Test pour initialisation du compte SGJMS
    if (
      (refSelected.toLowerCase().includes("progeliance") ||
        refSelected.toLowerCase().includes("cions") ||
        refSelected.toLowerCase().includes("yohann") ||
        refSelected.toLowerCase().includes("compte a terme") ||
        refSelected.toLowerCase().includes("d.g.f.i.p") ||
        refSelected.toLowerCase().includes("rem") ||
        refSelected.toLowerCase().includes("mma") ||
        refSelected.toLowerCase().includes("cpte") ||
        refSelected.toLowerCase().includes("expertise") ||
        refSelected.toLowerCase().includes("cdvg") ||
        refSelected.toLowerCase().includes("cat") ||
        refSelected.toLowerCase().includes("interets crediteurs")) &&
      sourceType === "SGJMS"
    ) {
      console.log("ref SGJMS");
      if (
        refSelected.toLowerCase().includes("progeliance") ||
        refSelected.toLowerCase().includes("cions")
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "627100";
          return newState;
        });
      }

      /////////

      if (
        refSelected.toLowerCase().includes("yohann") ||
        refSelected.toLowerCase().includes("rem") ||
        refSelected.toLowerCase().includes("expertise")
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "455000";
          return newState;
        });
      }

      //////

      if (
        refSelected.toLowerCase().includes("compte a terme") ||
        refSelected.toLowerCase().includes("cat")
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "508100";
          return newState;
        });
      }

      //////

      if (
        refSelected.toLowerCase().includes("mma") ||
        refSelected.toLowerCase().includes("cdvg")
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "616000";
          return newState;
        });
      }

      //////

      if (refSelected.toLowerCase().includes("cpte")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "580000";
          return newState;
        });
      }
      //////

      if (refSelected.toLowerCase().includes("d.g.f.i.p")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "445510";
          return newState;
        });
      }
      //////
      if (refSelected.toLowerCase().includes("interets crediteurs")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "768000";
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

    // Test pour initialisation du compte SGEP
    if (
      (libelleSelected.toLowerCase().includes("PROBTP".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("CIBTP".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("URSSAF".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("DGFIP".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("ABONNT".toLowerCase()) ||
        libelleSelected
          .toLowerCase()
          .includes("CION MOUVEMENT".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("BPIFRANCE".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("MMA IARD".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("JAZZPRO".toLowerCase()) ||
        libelleSelected.includes("221168100944") ||
        libelleSelected.includes("222084100944") ||
        libelleSelected.toLowerCase().includes("salaire".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("TETRIS".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("AGIPI".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("blicko lyon".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("allart".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("gharbit".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("REMISE CB".toLowerCase()) ||
        libelleSelected
          .toLowerCase()
          .includes("TOTALENERGIES DEVELOP".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("LCR".toLowerCase())) &&
      sourceType === "SGEP"
    ) {
      console.log("lib SGEP");

      if (libelleSelected.toLowerCase().includes("LCR".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "401LCR";
          return newState;
        });
      }

      //////
      if (
        libelleSelected.toLowerCase().includes("PROBTP".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("CIBTP".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("URSSAF".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("DGFIP".toLowerCase())
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "431000";
          return newState;
        });
      }

      /////////

      if (
        libelleSelected.toLowerCase().includes("ABONNT".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("CION MOUVEMENT".toLowerCase())
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "627100";
          return newState;
        });
      }

      //////

      if (
        libelleSelected.toLowerCase().includes("allart") ||
        libelleSelected.toLowerCase().includes("gharbit")
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "401001";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("BPIFRANCE".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "661110";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("MMA IARD".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "616000";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("JAZZPRO".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "627100";
          return newState;
        });
      }

      //////
      if (libelleSelected.includes("221168100944")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "164100";
          return newState;
        });
      }

      //////
      if (libelleSelected.includes("222084100944")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "164200";
          return newState;
        });
      }

      //////
      if (libelleSelected.toLowerCase().includes("salaire".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "421001";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("TETRIS".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "616100";
          return newState;
        });
      }

      //////
      if (libelleSelected.toLowerCase().includes("AGIPI".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "616400";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("blicko lyon".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "455100";
          return newState;
        });
      }

      //////
      if (libelleSelected.toLowerCase().includes("REMISE CB".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411PAR";
          return newState;
        });
      }

      //////
      if (
        libelleSelected
          .toLowerCase()
          .includes("TOTALENERGIES DEVELOP".toLowerCase())
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "164220";
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

    // Test pour initialisation du compte SGJMS
    if (
      (libelleSelected.toLowerCase().includes("progeliance") ||
        libelleSelected.toLowerCase().includes("cions") ||
        libelleSelected.toLowerCase().includes("yohann") ||
        libelleSelected.toLowerCase().includes("compte a terme") ||
        libelleSelected.toLowerCase().includes("d.g.f.i.p") ||
        libelleSelected.toLowerCase().includes("rem") ||
        libelleSelected.toLowerCase().includes("mma") ||
        libelleSelected.toLowerCase().includes("cpte") ||
        libelleSelected.toLowerCase().includes("expertise") ||
        libelleSelected.toLowerCase().includes("cdvg") ||
        libelleSelected.toLowerCase().includes("cat") ||
        libelleSelected.toLowerCase().includes("interets crediteurs")) &&
      sourceType === "SGJMS"
    ) {
      console.log("lib SGJMS");
      console.log("libelleSelected");
      console.log(libelleSelected);
      if (
        libelleSelected.toLowerCase().includes("progeliance") ||
        libelleSelected.toLowerCase().includes("cions")
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "627100";
          return newState;
        });
      }

      /////////

      if (
        libelleSelected.toLowerCase().includes("yohann") ||
        libelleSelected.toLowerCase().includes("rem") ||
        libelleSelected.toLowerCase().includes("expertise")
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "455000";
          return newState;
        });
      }

      //////

      if (
        libelleSelected.toLowerCase().includes("compte a terme") ||
        libelleSelected.toLowerCase().includes("cat")
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "508100";
          return newState;
        });
      }

      //////

      if (
        libelleSelected.toLowerCase().includes("mma") ||
        libelleSelected.toLowerCase().includes("cdvg")
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "616000";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("cpte")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "580000";
          return newState;
        });
      }
      //////

      if (libelleSelected.toLowerCase().includes("d.g.f.i.p")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "445510";
          return newState;
        });
      }
      //////
      if (libelleSelected.toLowerCase().includes("interets crediteurs")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "768000";
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setCompteSelectedArray(
      debitsTable.map(() => (sourceType === "SGEP" ? "401000" : null))
    );
    setIsOptionCptSelectedArray(
      debitsTable.map(() => (sourceType === "SGEP" ? true : false))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debitsTable]);

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
                    {row
                      .slice(3, 8)
                      .filter(Boolean)
                      .map((lib, i) => (
                        <option key={i} value={lib}>
                          {lib}
                        </option>
                      ))}
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
                    {row
                      .slice(3, 8)
                      .filter(Boolean)
                      .map((ref, i) => (
                        <option key={i} value={ref}>
                          {ref}
                        </option>
                      ))}
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
                      compteSelectedArray[index] === "401000"
                        ? "default-selected"
                        : (isOptionCptSelectedArray[index] &&
                            !isAutreCompteSelectedArray[index]) ||
                          (isOptionCptSelectedArray[index] &&
                            isAutreCompteSelectedArray[index] &&
                            isAutreCompteRenseigneArray[index])
                        ? "option-selected"
                        : ""
                    }
                  >
                    {/* <option value="">Choisissez un compte</option> */}
                    <option value="">
                      {sourceType === "SGEP" && compteSelectedArray[index]
                        ? compteSelectedArray[index]
                        : "Choisissez un compte"}
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

export default ListeDebits;
