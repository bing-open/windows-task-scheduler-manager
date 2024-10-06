const express = require('express');
const { PowerShell } = require('node-powershell');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

async function runPowerShellCommand(command) {
  const ps = new PowerShell({
    executionPolicy: 'Bypass',
    noProfile: true
  });

  try {
    await ps.addCommand(command);
    const result = await ps.invoke();
    return JSON.parse(result);
  } finally {
    await ps.dispose();
  }
}

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await runPowerShellCommand(`
      Get-ScheduledTask | Select-Object TaskName, TaskPath, State, LastRunTime, NextRunTime |
      ConvertTo-Json
    `);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  const { taskName, trigger, action } = req.body;
  try {
    await runPowerShellCommand(`
      $trigger = New-ScheduledTaskTrigger ${trigger}
      $action = New-ScheduledTaskAction ${action}
      Register-ScheduledTask -TaskName "${taskName}" -Trigger $trigger -Action $action
    `);
    res.status(201).json({ message: 'Task created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/tasks/:taskName', async (req, res) => {
  const { taskName } = req.params;
  const { trigger, action } = req.body;
  try {
    await runPowerShellCommand(`
      $trigger = New-ScheduledTaskTrigger ${trigger}
      $action = New-ScheduledTaskAction ${action}
      Set-ScheduledTask -TaskName "${taskName}" -Trigger $trigger -Action $action
    `);
    res.json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/tasks/:taskName', async (req, res) => {
  const { taskName } = req.params;
  try {
    await runPowerShellCommand(`Unregister-ScheduledTask -TaskName "${taskName}" -Confirm:$false`);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});