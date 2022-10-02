import { Worker, NearAccount } from "near-workspaces";
import anyTest, { TestFn } from "ava";

const WASM_DIR = "build/counter.ts.wasm";

const test = anyTest as TestFn<{
  worker: Worker;
  accounts: Record<string, NearAccount>;
}>;

test.beforeEach(async (t) => {
  // Init the worker and start a Sandbox server
  const worker = await Worker.init();

  // Deploy contract
  const root = worker.rootAccount;
  const contract = await root.createSubAccount("test-account");
  // Get wasm file path from package.json test script in folder above
  await contract.deploy(WASM_DIR);

  const ali = await root.createSubAccount("ali");
  const bob = await root.createSubAccount("bob");

  // Save state for test runs, it is unique for each test
  t.context.worker = worker;
  t.context.accounts = { root, contract, ali, bob };
});

test.afterEach(async (t) => {
  // Stop Sandbox server
  await t.context.worker.tearDown().catch((error) => {
    console.log("Failed to stop the Sandbox:", error);
  });
});

test("Initial count is 0", async (t) => {
  const { contract } = t.context.accounts;
  const result = await contract.view("getCount", {});
  t.is(result, 0);
});

test("Increase works", async (t) => {
  const { contract, ali, bob } = t.context.accounts;
  await ali.call(contract, "increase", {});

  let result = await contract.view("getCount", {});
  t.is(result, 1);

  await bob.call(contract, "increase", { n: 4 });
  result = await contract.view("getCount", {});
  t.is(result, 5);
});

test("Decrease works", async (t) => {
  const { contract, ali, bob } = t.context.accounts;
  await ali.call(contract, "decrease", {});

  let result = await contract.view("getCount", {});
  t.is(result, -1);

  let dec = await bob.callRaw(contract, "decrease", { n: 4 });
  // ensure imported log does work, not silent failure
  t.is(
    dec.result.receipts_outcome[0].outcome.logs[0],
    "Counter decreased to -5"
  );
  result = await contract.view("getCount", {});
  t.is(result, -5);
});
