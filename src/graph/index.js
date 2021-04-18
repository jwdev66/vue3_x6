import { Graph, Addon, FunctionExt, Shape, DataUri } from "@antv/x6";
import "./shape";

export default class FlowGraph {
  static graph;
  static stencil;
  static handleGraphAction;

  static init() {
    this.graph = new Graph({
      container: document.getElementById("container"),
      width: 1000,
      height: 800,
      background: {
        color: "#2b2f33",
      },
      //   grid: {
      //     visible: true,
      //   },
      selecting: {
        enabled: true,
        multiple: true,
        rubberband: true,
        movable: true,
        showNodeSelectionBox: true,
        filter: ["groupNode"],
      },
      connecting: {
        anchor: "center",
        connectionPoint: "anchor",
        allowBlank: false,
        highlight: true,
        snap: true,
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: "#5F95FF",
                strokeWidth: 2,
                strokeDasharray: 5,
                targetMarker: {
                  name: "classic",
                  size: 8,
                },
              },
            },
            router: {
              name: "normal",
            },
            zIndex: 0,
          });
        },
        validateConnection({
          sourceView,
          targetView,
          sourceMagnet,
          targetMagnet,
        }) {
          if (sourceView === targetView) {
            return false;
          }
          if (!sourceMagnet) {
            return false;
          }
          if (!targetMagnet) {
            return false;
          }
          if (targetMagnet.getAttribute("port-group") !== "top") {
            return false;
          }
          return true;
        },
      },
      highlighting: {
        magnetAvailable: {
          name: "stroke",
          args: {
            padding: 4,
            attrs: {
              strokeWidth: 4,
              stroke: "rgba(223,234,255)",
            },
          },
        },
      },
      snapline: true,
      history: true,
      clipboard: {
        enabled: true,
      },
      keyboard: {
        enabled: true,
      },
      embedding: {
        enabled: true,
        findParent({ node }) {
          const bbox = node.getBBox();
          return this.getNodes().filter((node) => {
            const data = node.getData();
            if (data && data.parent) {
              const targetBBox = node.getBBox();
              return bbox.isIntersectWithRect(targetBBox);
            }
            return false;
          });
        },
      },
    });
    this.initStencil();
    this.initShape();
    this.initActions();
    this.initEvent();
    return this.graph;
  }

  static initStencil() {
    this.stencil = new Addon.Stencil({
      title: "Node Type Selector",
      target: this.graph,
      stencilGraphWidth: 280,
      search: { rect: true },
      collapsable: true,
      groups: [
        {
          name: "basic",
          title: "Basic Node",
          graphHeight: 500,
          layoutOptions: {
            columns: 1,
            marginX: 60,
            rowHeight: 60,
          },
        },
      ],
    });
    const stencilContainer = document.getElementById("stencil"); //document.querySelector('#stencil')
    stencilContainer?.appendChild(this.stencil.container);
  }

  static initShape() {
    const { graph } = this;

    const orgNode = graph.createNode({
      shape: "org-node",
    });

    const projectNode = graph.createNode({
      shape: "project-node",
    });

    const functionNode = graph.createNode({
      shape: "function-node",
    });

    const deviceNode = graph.createNode({
      shape: "device-node",
    });

    const resourceNode = graph.createNode({
      shape: "resource-node",
    });

    const peopleNode = graph.createNode({
      shape: "people-node",
    });

    this.stencil.load(
      [
        orgNode,
        projectNode,
        functionNode,
        deviceNode,
        resourceNode,
        peopleNode,
      ],
      "basic"
    );
  }

  static showPorts(ports, show) {
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? "visible" : "hidden";
    }
  }

  static initActions() {
    const { graph } = this;
    const { history } = graph;

    const copy = () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.copy(cells);
      }
      return false;
    };

    const cut = () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.cut(cells);
      }
      return false;
    };

    const paste = () => {
      if (!graph.isClipboardEmpty()) {
        const cells = graph.paste({ offset: 32 });
        graph.cleanSelection();
        graph.select(cells);
      }
      return false;
    };

    const remove = () => {
      const { graph } = FlowGraph;
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.removeCells(cells);
      }
      return false;
    };

    graph.bindKey(["meta+z", "ctrl+z"], () => {
      if (history.canUndo()) {
        history.undo();
      }
      return false;
    });
    graph.bindKey(["meta+shift+z", "ctrl+y"], () => {
      if (history.canRedo()) {
        history.redo();
      }
      return false;
    });
    graph.bindKey(["meta+d", "ctrl+d"], () => {
      graph.clearCells();
      return false;
    });
    graph.bindKey(["meta+s", "ctrl+s"], () => {
      graph.toPNG((datauri) => {
        DataUri.downloadDataUri(datauri, "chart.png");
      });
      return false;
    });
    graph.bindKey(["meta+p", "ctrl+p"], () => {
      graph.printPreview();
      return false;
    });
    graph.bindKey(["meta+c", "ctrl+c"], copy);
    graph.bindKey(["meta+v", "ctrl+v"], paste);
    graph.bindKey(["meta+x", "ctrl+x"], cut);
    graph.bindKey(["delete"], remove);
  }

  static initEvent() {
    const { graph } = this;
    const container = document.getElementById("container");

    graph.on("edge:selected", ({ edge }) => {
      edge.attr("line/stroke", "#fcb16c");
      edge.attr("line/strokeDasharray", 0);
    });

    graph.on("edge:unselected", ({ edge }) => {
      edge.attr("line/stroke", "#5F95FF");
      edge.attr("line/strokeDasharray", 5);
    });

    graph.on(
      "node:mouseenter",
      FunctionExt.debounce(() => {
        const ports = container.querySelectorAll(".x6-port-body");
        this.showPorts(ports, true);
      }),
      500
    );
    graph.on("node:mouseleave", () => {
      const ports = container.querySelectorAll(".x6-port-body");
      this.showPorts(ports, false);
    });

    graph.on("node:dblclick", ({ node }) => {
    //   if (this.handleGraphAction) this.handleGraphAction("node-dblclick", node);
        const nodeTitle = node.attr('title/text')
        const newTitle = window.prompt("Please Enter Node Title", nodeTitle);
        if(newTitle) {
            node.attr('title/text', newTitle);
        }        
    });

    // graph.on('cell:contextmenu', ({ cell, e }) => {
    //     const p = graph.clientToGraph(e.clientX, e.clientY)
    // })
  }
}
