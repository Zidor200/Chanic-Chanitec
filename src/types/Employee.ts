export interface Employee {
  id: number;
  fullName: string;
  civilStatus: 'M' | 'C';
  birthDate: string;
  entryDate: string;
  seniority: string;
  contract: 'CDI' | 'CDD';
  function: string;
  subType: string;
  type: string;
  department?: string;
}

export const employees: Employee[] = [
  {
    id: 0,
    fullName: "Bilel AYACHI",
    civilStatus: "M",
    birthDate: "",
    entryDate: "",
    seniority: "",
    contract: "CDI",
    function: "Directeur",
    subType: "DIRECTION",
    type: "Department Froid et climatisation",
    department: "head"
  },
  // Chef de service Chargé de clim-domestique team
  {
    id: 1,
    fullName: "BALU MAVINGA Jean",
    civilStatus: "M",
    birthDate: "6/11/1981",
    entryDate: "9/9/2024",
    seniority: "00 ans 04 mois 24 jours",
    contract: "CDD",
    function: "TECHNICIEN FROID",
    subType: "UTEX",
    type: "Chef de service Chargé de clim-domestique",
    department: "domestic"
  },
  {
    id: 2,
    fullName: "IKALABA NKOSI Louison",
    civilStatus: "M",
    birthDate: "",
    entryDate: "",
    seniority: "",
    contract: "CDI",
    function: "TECHNICIEN CLIMATISATION",
    subType: "UTEX",
    type: "Chef de service Chargé de clim-domestique",
    department: "domestic"
  },
  {
    id: 3,
    fullName: "MATALATALA WISAMAU Richard",
    civilStatus: "M",
    birthDate: "",
    entryDate: "",
    seniority: "",
    contract: "CDI",
    function: "TECHNICIEN CLIMATISATION",
    subType: "UTEX",
    type: "Chef de service Chargé de clim-domestique",
    department: "domestic"
  },
  {
    id: 4,
    fullName: "MBENZA VUAMISA Willy",
    civilStatus: "M",
    birthDate: "",
    entryDate: "",
    seniority: "",
    contract: "CDI",
    function: "TECHNICIEN CLIMATISATION",
    subType: "UTEX",
    type: "Chef de service Chargé de clim-domestique",
    department: "domestic"
  },
  {
    id: 5,
    fullName: "MFIKA MFUNDU KIMPEMBE Roc",
    civilStatus: "M",
    birthDate: "",
    entryDate: "",
    seniority: "",
    contract: "CDI",
    function: "TECHNICIEN CLIMATISATION",
    subType: "UTEX",
    type: "Chef de service Chargé de clim-domestique",
    department: "domestic"
  },
  {
    id: 6,
    fullName: "TOKO ZABANA Juvénal",
    civilStatus: "M",
    birthDate: "",
    entryDate: "",
    seniority: "",
    contract: "CDI",
    function: "TECHNICIEN CLIMATISATION",
    subType: "UTEX",
    type: "Chef de service Chargé de clim-domestique",
    department: "domestic"
  },
  // Polyvalent team
  {
    id: 7,
    fullName: "KAKULALUA NGUVU Bienvenu",
    civilStatus: "M",
    birthDate: "",
    entryDate: "",
    seniority: "",
    contract: "CDI",
    function: "MONTEUR CLIMATISATION",
    subType: "POLYVALENT",
    type: "Polyvalent",
    department: "polyvalent"
  },
  {
    id: 8,
    fullName: "KAMAKAMA MBALA Joseph",
    civilStatus: "M",
    birthDate: "",
    entryDate: "",
    seniority: "",
    contract: "CDI",
    function: "MONTEUR CLIMATISATION",
    subType: "POLYVALENT",
    type: "Polyvalent",
    department: "polyvalent"
  },
  {
    id: 9,
    fullName: "KUMBANA MOYO Beckers",
    civilStatus: "C",
    birthDate: "",
    entryDate: "",
    seniority: "",
    contract: "CDI",
    function: "TECHNICIEN CLIMATISATION",
    subType: "POLYVALENT",
    type: "Polyvalent",
    department: "polyvalent"
  },
  {
    id: 10,
    fullName: "LUVUALU Thomas",
    civilStatus: "M",
    birthDate: "",
    entryDate: "",
    seniority: "",
    contract: "CDI",
    function: "TECHNICIEN CLIMATISATION",
    subType: "POLYVALENT",
    type: "Polyvalent",
    department: "polyvalent"
  },
  {
    id: 11,
    fullName: "MENANKUTIMA NSOMI Marc",
    civilStatus: "M",
    birthDate: "",
    entryDate: "",
    seniority: "",
    contract: "CDI",
    function: "TECHNICIEN CLIMATISATION",
    subType: "POLYVALENT",
    type: "Polyvalent",
    department: "polyvalent"
  },
  {
    id: 12,
    fullName: "MOBATUE MBEMBA Rigaen",
    civilStatus: "M",
    birthDate: "",
    entryDate: "",
    seniority: "",
    contract: "CDI",
    function: "MONTEUR CLIMATISATION",
    subType: "POLYVALENT",
    type: "Polyvalent",
    department: "polyvalent"
  },
  // Chef de service adj chargé du climatisation centralisé team
  {
    id: 13,
    fullName: "DIANABO KALIMUNDA Marius",
    civilStatus: "M",
    birthDate: "4/3/1958",
    entryDate: "9/6/2011",
    seniority: "13 ans 04 mois 28 jours",
    contract: "CDI",
    function: "CHAUFFEUR",
    subType: "AUCUN",
    type: "Chef de service adj chargé du climatisation centralisé",
    department: "central"
  },
  {
    id: 14,
    fullName: "MALONGA KUAMA Isidore",
    civilStatus: "M",
    birthDate: "",
    entryDate: "",
    seniority: "",
    contract: "CDI",
    function: "MONTEUR CLIMATISATION",
    subType: "PULLMAN",
    type: "Chef de service adj chargé du climatisation centralisé",
    department: "central"
  },
  {
    id: 15,
    fullName: "MBIYAVANGA MATALA Antoine",
    civilStatus: "M",
    birthDate: "",
    entryDate: "",
    seniority: "",
    contract: "CDI",
    function: "MONTEUR CLIMATISATION",
    subType: "PULLMAN",
    type: "Chef de service adj chargé du climatisation centralisé",
    department: "central"
  },
  {
    id: 16,
    fullName: "MUSOMONI KAFUTI Trésor-Benjamin",
    civilStatus: "M",
    birthDate: "",
    entryDate: "",
    seniority: "",
    contract: "CDI",
    function: "TECHNICIEN CLIMATISATION",
    subType: "BCDC",
    type: "Chef de service adj chargé du climatisation centralisé",
    department: "central"
  },
  {
    id: 17,
    fullName: "NDOMBASI NGOMBO Diego",
    civilStatus: "M",
    birthDate: "",
    entryDate: "",
    seniority: "",
    contract: "CDI",
    function: "TECHNICIEN CLIMATISATION",
    subType: "BCDC",
    type: "Chef de service adj chargé du climatisation centralisé",
    department: "central"
  },
  {
    id: 18,
    fullName: "NTOTO PHUATI Sylvain",
    civilStatus: "C",
    birthDate: "",
    entryDate: "",
    seniority: "",
    contract: "CDI",
    function: "TECHNICIEN FRIGORISTE",
    subType: "PULLMAN",
    type: "Chef de service adj chargé du climatisation centralisé",
    department: "central"
  },
  {
    id: 19,
    fullName: "SADI TONDASE Dodo",
    civilStatus: "C",
    birthDate: "",
    entryDate: "",
    seniority: "",
    contract: "CDI",
    function: "TECHNICIEN CLIMATISATION",
    subType: "BCDC",
    type: "Chef de service adj chargé du climatisation centralisé",
    department: "central"
  }
];