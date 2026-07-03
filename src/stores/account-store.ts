import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Address {
  id: string;
  label: string;
  line: string;
  city: string;
  isDefault?: boolean;
}

export interface AccountInfo {
  company: string;
  siret: string;
  sector: string;
  contactName: string;
  email: string;
  phone: string;
}

interface AccountState extends AccountInfo {
  addresses: Address[];
  update: (patch: Partial<AccountInfo>) => void;
  addAddress: (address: Omit<Address, "id">) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

export const useAccount = create<AccountState>()(
  persist(
    (set) => ({
      company: "Maison Léa",
      siret: "123 456 789 00012",
      sector: "Concept store",
      contactName: "Léa Martin",
      email: "lea@maison-lea.fr",
      phone: "06 12 34 56 78",
      addresses: [
        {
          id: "a1",
          label: "Boutique principale",
          line: "24 rue des Martyrs",
          city: "75009 Paris",
          isDefault: true,
        },
        {
          id: "a2",
          label: "Entrepôt",
          line: "8 place du Marché",
          city: "69001 Lyon",
        },
      ],
      update: (patch) => set((state) => ({ ...state, ...patch })),
      addAddress: (address) =>
        set((state) => ({
          addresses: [
            ...state.addresses,
            { ...address, id: `a${Date.now()}` },
          ],
        })),
      removeAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.filter((a) => a.id !== id),
        })),
      setDefaultAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        })),
    }),
    { name: "kult-b2b-account", version: 1 },
  ),
);
