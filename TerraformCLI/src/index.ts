import tasks = require("vsts-task-lib/task");
import { Terraform } from './terraform';
import { TerraformCommand } from "./terraform-command";
import { ITerraformProvider, TerraformProvider } from "./terraform-provider";

var terraformProvider: ITerraformProvider = new TerraformProvider(tasks);
var tf = new Terraform(terraformProvider);
tf.verifyVersion()
    .then(() => {
        var command = new TerraformCommand(
            tasks.getInput("command"),
            tasks.getPathInput("workingDirectory")
        );
        return tf.execute(command);
    })
    .then(() => {
        tasks.setResult(tasks.TaskResult.Succeeded, "");
    })
    .catch((error) => {
        tasks.setResult(tasks.TaskResult.Failed, error)
    })