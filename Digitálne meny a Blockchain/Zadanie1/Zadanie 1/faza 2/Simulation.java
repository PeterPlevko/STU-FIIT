// Príklad simulácie. Tento test spúšťa uzly na náhodnom grafe.
// Na konci vypíše ID transakcií, na ktorých bol podľa uzlov
// dosiahnutý konsenzus. Túto simuláciu môžete použiť na
// otestovanie svojich uzlov. Budete chcieť vyskúšať vytvoriť nejaké podvodné uzly a
// zmiešať ich v sieti na úplné otestovanie.

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Random;
import java.util.Set;
import java.util.HashMap;

public class Simulation {

   public static void main(String[] args) {

      // Sú štyri požadované argumenty v príkazovom riadku: p_graph (.1, .2, .3),
      // p_byzantine (.15, .30, .45), p_txDistribution (.01, .05, .10),
      // a numRounds (10, 20). Mali by ste sa pokúsiť otestovať svoj TrustedNode
      // kód pre všetky 3x3x3x2 = 54 kombinácií.

      int numNodes = 100;
      double p_graph = Double.parseDouble(args[0]); // parameter pre náhodný graf: pravdepodobnosť existencie hrany
      double p_byzantine = Double.parseDouble(args[1]); // pravdepodobnosť, že uzol bude nastavený ako byzantský
      double p_txDistribution = Double.parseDouble(args[2]); // pravdepodobnosť priradenia počiatočnej transakcie ku
                                                             // každému uzlu
      int numRounds = Integer.parseInt(args[3]); // počet simulačných kôl, pre ktoré budú vaše uzly bežať

      // vyberte, ktoré uzly sú byzantské a ktorým dôverujete
      Node[] nodes = new Node[numNodes];
      for (int i = 0; i < numNodes; i++) {
         if (Math.random() < p_byzantine)
            // Keď ste pripravení vyskúšať testovanie s byzantskými uzlami, nahraďte
            // inštanciu uvedenú nižšie s inštanciou byzantského uzla
            nodes[i] = new ByzantineNode(p_graph, p_byzantine, p_txDistribution, numRounds);
         else
            nodes[i] = new TrustedNode(p_graph, p_byzantine, p_txDistribution, numRounds);
      }

      // inicializovať náhodné sledovanie grafu
      boolean[][] followees = new boolean[numNodes][numNodes]; // followees[i][j] je true ak i sleduje j
      for (int i = 0; i < numNodes; i++) {
         for (int j = 0; j < numNodes; j++) {
            if (i == j)
               continue;
            if (Math.random() < p_graph) { // p_graph je .1, .2, or .3
               followees[i][j] = true;
            }
         }
      }

      // upozorni všetky uzly o ich nasledovníkoch
      for (int i = 0; i < numNodes; i++)
         nodes[i].followeesSet(followees[i]);

      // inicializuj set 500 platných transakcií s náhodnými id
      int numTx = 500;
      HashSet<Integer> validTxIds = new HashSet<Integer>();
      Random random = new Random();
      for (int i = 0; i < numTx; i++) {
         int r = random.nextInt();
         validTxIds.add(r);
      }

      // distribuuje 500 transakcií do všetkých uzlov a inicializuje ich
      // počiatočný stav transakcií, ktoré každý uzol počul. Distribúcia
      // je náhodná s pravdepodobnosťou p_txDistribution pre každý pár
      // Transkacia-Uzol.
      for (int i = 0; i < numNodes; i++) {
         HashSet<Transaction> pendingTransactions = new HashSet<Transaction>();
         for (Integer txID : validTxIds) {
            if (Math.random() < p_txDistribution) // p_txDistribution je .01, .05, or .10.
               pendingTransactions.add(new Transaction(txID));
         }
         nodes[i].pendingTransactionSet(pendingTransactions);
      }

      // Simuluj numRounds-krát
      for (int round = 0; round < numRounds; round++) { // numRounds je buď 10, alebo 20

         // zhromaždiť všetky návrhy do mapy. Kľúčom je index uzla prijímajúceho
         // návrhy. Hodnota je ArrayList obsahujúci polia celých čísel 1x2. Prvým
         // prvkom každého poľa je ID navrhovanej transakcie a druhý
         // element je indexové číslo uzla navrhujúceho transakciu.
         HashMap<Integer, ArrayList<Integer[]>> allProposals = new HashMap<>();

         for (int i = 0; i < numNodes; i++) {
            Set<Transaction> proposals = nodes[i].followersSend();
            for (Transaction tx : proposals) {
               if (!validTxIds.contains(tx.id))
                  continue; // skontroluje, aby každá tx bola skutočne platná

               for (int j = 0; j < numNodes; j++) {
                  if (!followees[j][i])
                     continue; // na tx záleží iba ak j nasleduje i

                  if(allProposals.containsKey(j)) {
                     Integer[] candidate = new Integer[2]; 
                     candidate[0] = tx.id;
                     candidate[1] = i; 
                     allProposals.get(j).add(candidate);
                  } else {
                     ArrayList<Integer[]> candidates = new ArrayList<Integer[]>();
                     Integer[] candidate = new Integer[2]; 
                     candidate[0] = tx.id; 
                     candidate[1] = i;   
                     candidates.add(candidate);
                     allProposals.put(j, candidates);
                  }
               }

            }
         }

         // Distribuuje návrhy k ich zamýšľaným príjemcom ako kandidátom
         for (int i = 0; i < numNodes; i++) {
            if (allProposals.containsKey(i))
               nodes[i].followeesReceive(allProposals.get(i));
         }
      }

      // vypíš výsledky
      for (int i = 0; i < numNodes; i++) {
         Set<Transaction> transactions = nodes[i].followersSend();
         System.out.println("Transaction ids that Node " + i + " believes consensus on:");
         for (Transaction tx : transactions)
            System.out.println(tx.id);
         System.out.println();
         System.out.println();
      }

   }

}
