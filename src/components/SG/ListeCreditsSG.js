import React, { useState } from "react";
import Papa from "papaparse";

const ListeCredits = ({ creditsTable, sourceName, sourceType }) => {
  console.log("ListeCredits");
  console.log("creditsTable");
  console.log(creditsTable);
  let compteOptionsSGEP = [
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
    "411AND",
    "411ATI",
    "411AXO",
    "411BEL",
    "411BON",
    "411BOU",
    "411BTB",
    "411CAP",
    "411CBT",
    "411CEO",
    "411CEP",
    "411CES",
    "411CHA",
    "411CI2",
    "411CIT",
    "411CIV",
    "411COG",
    "411COT",
    "411DAB",
    "411DIF",
    "411DUO",
    "411ESP",
    "411EVO",
    "411FOB",
    "411FOL",
    "411FON",
    "411FOT",
    "411FRA",
    "411GAG",
    "411GES",
    "411GON",
    "411GRA",
    "411HUM",
    "411IMM",
    "411ITI",
    "411JUL",
    "411JUN",
    "411JUP",
    "411KOR",
    "411LCB",
    "411LEH",
    "411LOD",
    "411LOM",
    "411LYI",
    "411MAR",
    "411MUL",
    "411MUS",
    "411MYH",
    "411NEO",
    "411OFY",
    "411ORK",
    "411ORP",
    "411PAR",
    "411PAY",
    "411PIC",
    "411PLU",
    "411POR",
    "411PRI",
    "411REG",
    "411REM",
    "411RLM",
    "411ROS",
    "411SAB",
    "411SAG",
    "411SAL",
    "411SIM",
    "411SMC",
    "411SQA",
    "411SQV",
    "411TAI",
    "411TAR",
    "411VIC",
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
    "455500",
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
    "791005",
    "791010",
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
        row[2], // Montant
      ];

      // Deuxième ligne pour chaque itération
      const secondLine = [
        row[0], // Date
        "OD",
        sourceType === "SGEP" ? "512000" : "512100",
        refSelectedArray[index],
        libelleSelectedArray[index],
        row[2], // Montant
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

    // Test pour initialisation du compte SGEP pour la ref
    if (
      (refSelected.toLowerCase().includes("bouscasse".toLowerCase()) ||
        refSelected.toLowerCase().includes("bouvet".toLowerCase()) ||
        refSelected.toLowerCase().includes("Brotteaux".toLowerCase()) ||
        refSelected.toLowerCase().includes("CACEI".toLowerCase()) ||
        refSelected.toLowerCase().includes("capsa".toLowerCase()) ||
        refSelected.toLowerCase().includes("cesar".toLowerCase()) ||
        refSelected.toLowerCase().includes("CHQ".toLowerCase()) ||
        refSelected.toLowerCase().includes("dabreteau".toLowerCase()) ||
        refSelected.toLowerCase().includes("Dify".toLowerCase()) ||
        refSelected.toLowerCase().includes("G.S.I".toLowerCase()) ||
        refSelected.toLowerCase().includes("G2G".toLowerCase()) ||
        refSelected.toLowerCase().includes("Gestion Immo Lyon".toLowerCase()) ||
        refSelected.toLowerCase().includes("Immokalis".toLowerCase()) ||
        refSelected.toLowerCase().includes("lumiere".toLowerCase()) ||
        refSelected.toLowerCase().includes("MODICA".toLowerCase()) ||
        refSelected.toLowerCase().includes("Multi".toLowerCase()) ||
        refSelected.toLowerCase().includes("Multisimo".toLowerCase()) ||
        refSelected.toLowerCase().includes("NUOVA".toLowerCase()) ||
        refSelected.toLowerCase().includes("PayPal".toLowerCase()) ||
        refSelected.toLowerCase().includes("Primogest".toLowerCase()) ||
        refSelected.toLowerCase().includes("Remise CB".toLowerCase()) ||
        refSelected.toLowerCase().includes("RHONE SAONE".toLowerCase()) ||
        refSelected.toLowerCase().includes("SAB IMMO".toLowerCase()) ||
        refSelected.toLowerCase().includes("SAGNIMORTE".toLowerCase()) ||
        refSelected.toLowerCase().includes("SORBIERS".toLowerCase()) ||
        refSelected.toLowerCase().includes("REMAX".toLowerCase()) ||
        refSelected.toLowerCase().includes("TARGE".toLowerCase()) ||
        refSelected.toLowerCase().includes("GALLICHET".toLowerCase()) ||
        refSelected.toLowerCase().includes("HOREA".toLowerCase()) ||
        refSelected.toLowerCase().includes("itinova") ||
        refSelected.toLowerCase().includes("belles annees") ||
        refSelected.toLowerCase().includes("tresorerie") ||
        refSelected.toLowerCase().includes("rer") ||
        refSelected.toLowerCase().includes("tailor") ||
        refSelected.toLowerCase().includes("aide unique") ||
        refSelected.toLowerCase().includes("cpte a cpte") ||
        refSelected.toLowerCase().includes("neoloc") ||
        refSelected.toLowerCase().includes("carre zola") ||
        refSelected.toLowerCase().includes("metropole") ||
        refSelected.toLowerCase().includes("korian") ||
        refSelected.toLowerCase().includes("cap avenir") ||
        refSelected.toLowerCase().includes("orpi key") ||
        refSelected.toLowerCase().includes("franchet") ||
        refSelected.toLowerCase().includes("regie nouvelle") ||
        refSelected.toLowerCase().includes("simonneau") ||
        refSelected.toLowerCase().includes("june") ||
        refSelected.toLowerCase().includes("jazzpro") ||
        refSelected.toLowerCase().includes("palluat") ||
        refSelected.toLowerCase().includes("sdl") ||
        refSelected.toLowerCase().includes("lodgis") ||
        refSelected.toLowerCase().includes("ma regie") ||
        refSelected.toLowerCase().includes("hpi") ||
        refSelected.toLowerCase().includes("ofygest") ||
        refSelected.toLowerCase().includes("presqu'ile") ||
        refSelected.toLowerCase().includes("part dieu") ||
        refSelected.toLowerCase().includes("smci") ||
        refSelected.toLowerCase().includes("palatine") ||
        refSelected.toLowerCase().includes("duoloc") ||
        refSelected.toLowerCase().includes("gat") ||
        refSelected.toLowerCase().includes("cotrimo") ||
        refSelected.toLowerCase().includes("lyon immo") ||
        refSelected.toLowerCase().includes("victoire") ||
        refSelected.toLowerCase().includes("axorent") ||
        refSelected.toLowerCase().includes("andrimmo") ||
        refSelected.toLowerCase().includes("evotion") ||
        refSelected.toLowerCase().includes("human") ||
        refSelected.toLowerCase().includes("lehome") ||
        refSelected.toLowerCase().includes("lombard") ||
        refSelected.toLowerCase().includes("horvath") ||
        refSelected.toLowerCase().includes("compte a compte") ||
        refSelected.toLowerCase().includes("picq") ||
        refSelected.toLowerCase().includes("bonnefoy") ||
        refSelected.toLowerCase().includes("bourguignon") ||
        refSelected.toLowerCase().includes("gsi") ||
        refSelected
          .toLowerCase()
          .includes("GRAND LYON IMMOBILIER".toLowerCase())) &&
      sourceType === "SGEP"
    ) {
      // console.log("CAS CRITERE DETECTE");
      // console.log("refSelected");
      // console.log(refSelected);

      if (
        refSelected
          .toLowerCase()
          .includes("GRAND LYON IMMOBILIER".toLowerCase())
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411GRA";
          return newState;
        });
      }

      /////////

      if (refSelected.toLowerCase().includes("HOREA".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411MYH";
          return newState;
        });
      }

      /////////

      if (refSelected.toLowerCase().includes("GALLICHET".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411CIT";
          return newState;
        });
      }

      /////////

      if (refSelected.toLowerCase().includes("TARGE".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411TAR";
          return newState;
        });
      }

      /////////
      if (refSelected.toLowerCase().includes("REMAX".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411REM";
          return newState;
        });
      }

      /////////

      if (refSelected.toLowerCase().includes("CHQ".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411PAR";
          return newState;
        });
      }

      /////////

      if (refSelected.toLowerCase().includes("PICQ".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411PIC";
          return newState;
        });
      }

      /////////
      if (refSelected.toLowerCase().includes("paypal")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411PAY";
          return newState;
        });
      }

      /////////

      if (
        refSelected.toLowerCase().includes("Primogest".toLowerCase()) ||
        refSelected.toLowerCase().includes("RHONE SAONE".toLowerCase()) ||
        refSelected.toLowerCase().includes("SORBIERS".toLowerCase())
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411PRI";
          return newState;
        });
      }

      //////

      if (refSelected.toLowerCase().includes("bouscasse".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411BOU";
          return newState;
        });
      }

      //////

      if (refSelected.toLowerCase().includes("bouvet")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411FOB";
          return newState;
        });
      }

      //////

      if (refSelected.toLowerCase().includes("brotteaux")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411ESP";
          return newState;
        });
      }

      //////

      if (refSelected.toLowerCase().includes("cacei")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411SQA";
          return newState;
        });
      }

      //////
      if (refSelected.toLowerCase().includes("capsa")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411CAP";
          return newState;
        });
      }

      //////
      if (refSelected.toLowerCase().includes("cesar")) {
        console.log("cesar");
        console.log(refSelected);
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411CES";
          return newState;
        });
      }

      //////

      if (refSelected.toLowerCase().includes("dabreteau")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411DAB";
          return newState;
        });
      }

      //////
      if (refSelected.toLowerCase().includes("dify")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411DIF";
          return newState;
        });
      }

      //////

      if (
        refSelected.toLowerCase().includes("g.s.i") ||
        refSelected.toLowerCase().includes("GSI")
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411GAG";
          return newState;
        });
      }

      //////
      if (refSelected.toLowerCase().includes("g2g")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411GON";
          return newState;
        });
      }

      //////
      if (refSelected.toLowerCase().includes("gestion immo lyon")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411GES";
          return newState;
        });
      }

      //////
      if (refSelected.toLowerCase().includes("immokalis")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411IMM";
          return newState;
        });
      }

      //////
      if (refSelected.toLowerCase().includes("lumiere")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411CIV";
          return newState;
        });
      }

      //////
      if (refSelected.toLowerCase().includes("modica")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411ROS";
          return newState;
        });
      }

      //////
      if (refSelected.toLowerCase().includes("multi")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411MUL";
          return newState;
        });
      }

      //////
      if (refSelected.toLowerCase().includes("nuova")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411POR";
          return newState;
        });
      }

      //////
      if (refSelected.toLowerCase().includes("remise cb")) {
        console.log("REMISE CB");
        console.log(refSelected);
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411CBT";
          return newState;
        });
      }

      //////
      if (refSelected.toLowerCase().includes("sab immo")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411SAB";
          return newState;
        });
      }

      //////
      if (refSelected.toLowerCase().includes("sagnimorte")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411SAG";
          return newState;
        });
      }

      //////
      if (refSelected.toLowerCase().includes("itinova")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411ITI";
          return newState;
        });
      }

      //////
      if (refSelected.toLowerCase().includes("tailor")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411TAI";
          return newState;
        });
      }

      //////
      if (refSelected.toLowerCase().includes("aide unique")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "791010";
          return newState;
        });
      }

      //////
      if (refSelected.toLowerCase().includes("neoloc")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411NEO";
          return newState;
        });
      }

      //////
      if (
        refSelected.toLowerCase().includes("metropole") ||
        refSelected.toLowerCase().includes("HORVATH")
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411RLM";
          return newState;
        });
      }

      //////
      if (refSelected.toLowerCase().includes("korian")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411KOR";
          return newState;
        });
      }

      //////
      if (refSelected.toLowerCase().includes("orpi key")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411ORK";
          return newState;
        });
      }

      //////
      if (
        refSelected.toLowerCase().includes("franchet") ||
        refSelected.toLowerCase().includes("sdl")
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411FRA";
          return newState;
        });
      }

      //////
      if (refSelected.toLowerCase().includes("regie nouvelle")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411REG";
          return newState;
        });
      }

      //////
      if (refSelected.toLowerCase().includes("simonneau")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411SIM";
          return newState;
        });
      }

      //////
      if (refSelected.toLowerCase().includes("june")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411JUN";
          return newState;
        });
      }

      //////
      if (refSelected.toLowerCase().includes("jazzpro")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "627100";
          return newState;
        });
      }

      //////
      if (
        refSelected.toLowerCase().includes("palluat") ||
        refSelected.toLowerCase().includes("bourguignon")
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411CI2";
          return newState;
        });
      }
      //////
      if (
        refSelected.toLowerCase().includes("belles annees") ||
        refSelected.toLowerCase().includes("carre zola") ||
        refSelected.toLowerCase().includes("cap avenir")
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411BEL";
          return newState;
        });
      }

      //////
      if (refSelected.toLowerCase().includes("BONNEFOY")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411BON";
          return newState;
        });
      }

      /////////

      if (
        refSelected.toLowerCase().includes("tresorerie") ||
        refSelected.toLowerCase().includes("rer") ||
        refSelected.toLowerCase().includes("cpte a cpte") ||
        refSelected.toLowerCase().includes("COMPTE A COMPTE")
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "455500";
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

      if (refSelected.toLowerCase().includes("LODGIS")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411LOD";
          return newState;
        });
      }

      //////

      if (refSelected.toLowerCase().includes("MA REGIE")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411MAR";
          return newState;
        });
      }

      //////

      if (refSelected.toLowerCase().includes("HPI")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411CEO";
          return newState;
        });
      }

      //////

      if (refSelected.toLowerCase().includes("OFYGEST")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411OFY";
          return newState;
        });
      }

      //////

      if (refSelected.toLowerCase().includes("PRESQU'ILE")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411CEP";
          return newState;
        });
      }

      //////

      if (refSelected.toLowerCase().includes("PART DIEU")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411ORP";
          return newState;
        });
      }

      //////

      if (refSelected.toLowerCase().includes("SMCI")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411SMC";
          return newState;
        });
      }

      //////

      if (refSelected.toLowerCase().includes("PALATINE")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411FOT";
          return newState;
        });
      }

      //////

      if (refSelected.toLowerCase().includes("DUOLOC")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411DUO";
          return newState;
        });
      }

      //////

      if (refSelected.toLowerCase().includes("GAT")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "791005";
          return newState;
        });
      }

      //////

      if (refSelected.toLowerCase().includes("COTRIMO")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411COT";
          return newState;
        });
      }

      if (refSelected.toLowerCase().includes("AXORENT")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411AXO";
          return newState;
        });
      }

      if (refSelected.toLowerCase().includes("ANDRIMMO")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411AND";
          return newState;
        });
      }

      if (refSelected.toLowerCase().includes("EVOTION")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411EVO";
          return newState;
        });
      }

      if (refSelected.toLowerCase().includes("HUMAN")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411HUM";
          return newState;
        });
      }

      if (refSelected.toLowerCase().includes("LEHOME")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411LEH";
          return newState;
        });
      }

      if (refSelected.toLowerCase().includes("LOMBARD")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411LOM";
          return newState;
        });
      }

      if (refSelected.toLowerCase().includes("LYON IMMO")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411LYI";
          return newState;
        });
      }

      if (refSelected.toLowerCase().includes("VICTOIRE")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411VIC";
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

    // Test pour initialisation du compte SGEP pour le libellé
    if (
      (libelleSelected.toLowerCase().includes("bouscasse".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("bouvet".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("Brotteaux".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("CACEI".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("capsa".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("cesar".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("CHQ".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("dabreteau".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("Dify".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("G.S.I".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("G2G".toLowerCase()) ||
        libelleSelected
          .toLowerCase()
          .includes("Gestion Immo Lyon".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("Immokalis".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("lumiere".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("MODICA".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("Multi".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("Multisimo".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("NUOVA".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("PayPal".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("Primogest".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("Remise CB".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("RHONE SAONE".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("SAB IMMO".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("SAGNIMORTE".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("SORBIERS".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("REMAX".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("TARGE".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("GALLICHET".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("HOREA".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("itinova") ||
        libelleSelected.toLowerCase().includes("belles annees") ||
        libelleSelected.toLowerCase().includes("tresorerie") ||
        libelleSelected.toLowerCase().includes("rer") ||
        libelleSelected.toLowerCase().includes("tailor") ||
        libelleSelected.toLowerCase().includes("aide unique") ||
        libelleSelected.toLowerCase().includes("cpte a cpte") ||
        libelleSelected.toLowerCase().includes("neoloc") ||
        libelleSelected.toLowerCase().includes("carre zola") ||
        libelleSelected.toLowerCase().includes("metropole") ||
        libelleSelected.toLowerCase().includes("korian") ||
        libelleSelected.toLowerCase().includes("cap avenir") ||
        libelleSelected.toLowerCase().includes("orpi key") ||
        libelleSelected.toLowerCase().includes("franchet") ||
        libelleSelected.toLowerCase().includes("regie nouvelle") ||
        libelleSelected.toLowerCase().includes("simonneau") ||
        libelleSelected.toLowerCase().includes("june") ||
        libelleSelected.toLowerCase().includes("jazzpro") ||
        libelleSelected.toLowerCase().includes("palluat") ||
        libelleSelected.toLowerCase().includes("sdl") ||
        libelleSelected.toLowerCase().includes("lodgis") ||
        libelleSelected.toLowerCase().includes("ma regie") ||
        libelleSelected.toLowerCase().includes("hpi") ||
        libelleSelected.toLowerCase().includes("ofygest") ||
        libelleSelected.toLowerCase().includes("presqu'ile") ||
        libelleSelected.toLowerCase().includes("part dieu") ||
        libelleSelected.toLowerCase().includes("smci") ||
        libelleSelected.toLowerCase().includes("palatine") ||
        libelleSelected.toLowerCase().includes("duoloc") ||
        libelleSelected.toLowerCase().includes("gat") ||
        libelleSelected.toLowerCase().includes("cotrimo") ||
        libelleSelected.toLowerCase().includes("lyon immo") ||
        libelleSelected.toLowerCase().includes("victoire") ||
        libelleSelected.toLowerCase().includes("axorent") ||
        libelleSelected.toLowerCase().includes("andrimmo") ||
        libelleSelected.toLowerCase().includes("evotion") ||
        libelleSelected.toLowerCase().includes("human") ||
        libelleSelected.toLowerCase().includes("lehome") ||
        libelleSelected.toLowerCase().includes("lombard") ||
        libelleSelected.toLowerCase().includes("horvath") ||
        libelleSelected.toLowerCase().includes("compte a compte") ||
        libelleSelected.toLowerCase().includes("picq") ||
        libelleSelected.toLowerCase().includes("bonnefoy") ||
        libelleSelected.toLowerCase().includes("bourguignon") ||
        libelleSelected.toLowerCase().includes("gsi") ||
        libelleSelected
          .toLowerCase()
          .includes("GRAND LYON IMMOBILIER".toLowerCase())) &&
      sourceType === "SGEP"
    ) {
      // console.log("CAS CRITERE DETECTE");
      // console.log("libelleSelected");
      // console.log(libelleSelected);

      if (
        libelleSelected
          .toLowerCase()
          .includes("GRAND LYON IMMOBILIER".toLowerCase())
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411GRA";
          return newState;
        });
      }

      /////////

      if (libelleSelected.toLowerCase().includes("HOREA".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411MYH";
          return newState;
        });
      }

      /////////

      if (libelleSelected.toLowerCase().includes("GALLICHET".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411CIT";
          return newState;
        });
      }

      /////////

      if (libelleSelected.toLowerCase().includes("TARGE".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411TAR";
          return newState;
        });
      }

      /////////
      if (libelleSelected.toLowerCase().includes("REMAX".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411REM";
          return newState;
        });
      }

      /////////
      if (libelleSelected.toLowerCase().includes("CHQ".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411PAR";
          return newState;
        });
      }

      /////////
      if (libelleSelected.toLowerCase().includes("PICQ".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411PIC";
          return newState;
        });
      }
      /////////
      if (libelleSelected.toLowerCase().includes("paypal")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411PAY";
          return newState;
        });
      }

      /////////

      if (
        libelleSelected.toLowerCase().includes("Primogest".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("RHONE SAONE".toLowerCase()) ||
        libelleSelected.toLowerCase().includes("SORBIERS".toLowerCase())
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411PRI";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("bouscasse".toLowerCase())) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411BOU";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("bouvet")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411FOB";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("brotteaux")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411ESP";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("cacei")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411SQA";
          return newState;
        });
      }

      //////
      if (libelleSelected.toLowerCase().includes("capsa")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411CAP";
          return newState;
        });
      }

      //////
      if (libelleSelected.toLowerCase().includes("cesar")) {
        console.log("cesar");
        console.log(libelleSelected);
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411CES";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("dabreteau")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411DAB";
          return newState;
        });
      }

      //////
      if (libelleSelected.toLowerCase().includes("dify")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411DIF";
          return newState;
        });
      }

      //////

      if (
        libelleSelected.toLowerCase().includes("g.s.i") ||
        libelleSelected.toLowerCase().includes("GSI")
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411GAG";
          return newState;
        });
      }

      //////
      if (libelleSelected.toLowerCase().includes("g2g")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411GON";
          return newState;
        });
      }

      //////
      if (libelleSelected.toLowerCase().includes("gestion immo lyon")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411GES";
          return newState;
        });
      }

      //////
      if (libelleSelected.toLowerCase().includes("immokalis")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411IMM";
          return newState;
        });
      }

      //////
      if (libelleSelected.toLowerCase().includes("lumiere")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411CIV";
          return newState;
        });
      }

      //////
      if (libelleSelected.toLowerCase().includes("modica")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411ROS";
          return newState;
        });
      }

      //////
      if (libelleSelected.toLowerCase().includes("multi")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411MUL";
          return newState;
        });
      }

      //////
      if (libelleSelected.toLowerCase().includes("nuova")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411POR";
          return newState;
        });
      }

      //////
      if (libelleSelected.toLowerCase().includes("remise cb")) {
        console.log("CRITERE remise cb");

        console.log(libelleSelected);
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411CBT";
          return newState;
        });
      }

      //////
      if (libelleSelected.toLowerCase().includes("sab immo")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411SAB";
          return newState;
        });
      }

      //////
      if (libelleSelected.toLowerCase().includes("sagnimorte")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411SAG";
          return newState;
        });
      }

      //////
      if (libelleSelected.toLowerCase().includes("itinova")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411ITI";
          return newState;
        });
      }

      //////
      if (libelleSelected.toLowerCase().includes("tailor")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411TAI";
          return newState;
        });
      }

      //////
      if (libelleSelected.toLowerCase().includes("aide unique")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "791010";
          return newState;
        });
      }

      //////
      if (libelleSelected.toLowerCase().includes("neoloc")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411NEO";
          return newState;
        });
      }

      //////
      if (
        libelleSelected.toLowerCase().includes("metropole") ||
        libelleSelected.toLowerCase().includes("HORVATH")
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411RLM";
          return newState;
        });
      }

      //////
      if (libelleSelected.toLowerCase().includes("korian")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411KOR";
          return newState;
        });
      }

      //////
      if (libelleSelected.toLowerCase().includes("orpi key")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411ORK";
          return newState;
        });
      }

      //////
      if (
        libelleSelected.toLowerCase().includes("franchet") ||
        libelleSelected.toLowerCase().includes("sdl")
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411FRA";
          return newState;
        });
      }

      //////
      if (libelleSelected.toLowerCase().includes("regie nouvelle")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411REG";
          return newState;
        });
      }

      //////
      if (libelleSelected.toLowerCase().includes("simonneau")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411SIM";
          return newState;
        });
      }

      //////
      if (libelleSelected.toLowerCase().includes("june")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411JUN";
          return newState;
        });
      }

      //////
      if (libelleSelected.toLowerCase().includes("jazzpro")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "627100";
          return newState;
        });
      }

      //////
      if (
        libelleSelected.toLowerCase().includes("palluat") ||
        libelleSelected.toLowerCase().includes("bourguignon")
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411CI2";
          return newState;
        });
      }
      //////
      if (
        libelleSelected.toLowerCase().includes("belles annees") ||
        libelleSelected.toLowerCase().includes("carre zola") ||
        libelleSelected.toLowerCase().includes("cap avenir")
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411BEL";
          return newState;
        });
      }

      //////
      if (libelleSelected.toLowerCase().includes("BONNEFOY")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411BON";
          return newState;
        });
      }

      /////////

      if (
        libelleSelected.toLowerCase().includes("tresorerie") ||
        libelleSelected.toLowerCase().includes("rer") ||
        libelleSelected.toLowerCase().includes("cpte a cpte") ||
        libelleSelected.toLowerCase().includes("COMPTE A COMPTE")
      ) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "455500";
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

      if (libelleSelected.toLowerCase().includes("LODGIS")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411LOD";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("MA REGIE")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411MAR";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("HPI")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411CEO";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("OFYGEST")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411OFY";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("PRESQU'ILE")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411CEP";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("PART DIEU")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411ORP";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("SMCI")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411SMC";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("PALATINE")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411FOT";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("DUOLOC")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411DUO";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("GAT")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "791005";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("COTRIMO")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411COT";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("AXORENT")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411AXO";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("ANDRIMMO")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411AND";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("EVOTION")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411EVO";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("HUMAN")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411HUM";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("LEHOME")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411LEH";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("LOMBARD")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411LOM";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("LYON IMMO")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411LYI";
          return newState;
        });
      }

      //////

      if (libelleSelected.toLowerCase().includes("VICTOIRE")) {
        setCompteSelectedArray((prevState) => {
          const newState = [...prevState];
          newState[index] = "411VIC";
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

    //////

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
              <h4>Montant: {row[2]} €</h4>
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
                      (isOptionCptSelectedArray[index] &&
                        !isAutreCompteSelectedArray[index]) ||
                      (isOptionCptSelectedArray[index] &&
                        isAutreCompteSelectedArray[index] &&
                        isAutreCompteRenseigneArray[index])
                        ? "option-selected"
                        : ""
                    }
                  >
                    <option value="">Choisissez un compte</option>
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

export default ListeCredits;
