<script setup lang="ts">
import NeoVis from 'neovis.js/dist/neovis.js'
import { onMounted } from 'vue'

interface SelectedAnnotationInformation {
  createdAt: string
  shortcut: string
  firebaseUserUID: string
  name: string
  description: string
  id: string
}

const props = defineProps({
  index: Number,
  selectedAnnotation: {
    type: Array as () => SelectedAnnotationInformation[],
    default: () => []
  }
})

onMounted(async () => {
  let neoViz = null

  const config = {
    containerId: `viz${props.index}`,

    neo4j: {
      serverUrl: 'bolt://localhost:7687',
      serverUser: 'neo4j',
      serverPassword: '123456789'
    },
    visConfig: {
      nodes: {
        shape: 'circle',
        size: 100,
        font: {
          color: 'black',
          size: 10
        },
        color: {
          border: '#2B7CE9',
          background: '#97C2FC',
          highlight: {
            border: '#red',
            background: '#D2E5FF'
          },
          hover: {
            border: '#2B7CE9',
            background: '#D2E5FF'
          }
        }
      },
      edges: {
        color: {
          color: '#00ffff',
          highlight: '#ff0000'
        },
        selectionWidth: 2,
        length: 200,
        width: 1,
        arrows: {
          to: { enabled: true }
        }
      },
      physics: {
        hierarchicalRepulsion: { avoidOverlap: 1 },
        solver: 'repulsion',
        repulsion: {
          nodeDistance: 100
        }
      }
    },

    layout: {
      improvedLayout: true,
      randomSeed: 420,
      hierarchical: {
        enabled: true,
        direction: 'DU',
        sortMethod: 'directed',
        nodeSpacing: 1000,
        treeSpacing: 20,
        levelSeparation: 250
      }
    },

    labels: {
      Annotation: {
        label: 'name',
        value: 'id',

        [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
          function: {
            title: (props: any) =>
              NeoVis.objectToTitleHtml(props, [
                'id',
                'name',
                'shortcut',
                'description',
                'createdAt',
                'firebaseUserUID'
              ]),
            color: (node: any) => {
              const selectedAnnotationIds = props.selectedAnnotation.map(
                (annotation: any) => annotation.id
              )
              if (selectedAnnotationIds.includes(node.properties.id)) {
                return '#e74c3c'
              } else {
                return '#3498db'
              }
            }
          }
        }
      }
    },

    relationships: {
      RELATED_TO: {
        value: 'weight',

        [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
          static: {
            label: 'RELATED_TO',
            color: 'green',
            font: {
              background: 'none',
              strokeWidth: '0',
              size: 10,
              color: 'Black'
            }
          }
        }
      }
    },

    hierarchical_layout: true,
    hierarchical_sort_method: 'directed',

    initialCypher: `MATCH (start:Annotation {id: '${props.selectedAnnotation[0].id}'})
                    OPTIONAL MATCH (a:Annotation)-[r:RELATED_TO*]-(start)
                    RETURN a AS node, r AS relationship, start AS otherNode
                    UNION
                    MATCH (start:Annotation {id: '${props.selectedAnnotation[0].id}'})
                    OPTIONAL MATCH (start)-[r:RELATED_TO*]-(b:Annotation)
                    RETURN start AS node, r AS relationship, b AS otherNode`
  }

  neoViz = new NeoVis(config)
  neoViz.render()
})
</script>

<template>
  <div
    class="mx-auto h-full w-full flex justify-center border border-gray-300"
    :id="`viz${props.index}`"
  ></div>
</template>

<style scoped></style>
