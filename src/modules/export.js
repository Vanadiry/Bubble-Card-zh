import jsyaml from 'js-yaml';
import { fireToast } from './cache.js';

function getCleanExportData(moduleData) {
  // Destructure to extract only the desired properties.
  // This ensures that any extra properties on moduleData are ignored.
  const { 
    id, 
    name, 
    version, 
    creator, 
    link,
    supported,
    description, 
    code, 
    editor 
  } = { ...moduleData };

  // Reconstruct the object to control the order of properties for consistent output.
  const cleanData = {
    name,
    version,
    creator,
    link,
    supported,
    description,
    code,
    editor
  };
  
  // Remove any properties that are undefined, null, or an empty link.
  Object.keys(cleanData).forEach(key => {
    const value = cleanData[key];
    if (value === undefined || value === null || (key === 'link' && value === '')) {
      delete cleanData[key];
    }
  });

  return { id, cleanData };
}

export function generateYamlExport(moduleData) {
  try {
    const { id, cleanData } = getCleanExportData(moduleData);
    
    // Create YAML structure
    const moduleObj = {
      [id]: cleanData
    };
    
    // Convert to YAML
    const yamlContent = jsyaml.dump(moduleObj, {
      indent: 2,
      lineWidth: -1,
      noRefs: true,
      noCompatMode: true,
      sortKeys: false // Keep property order
    });
    
    return yamlContent;
  } catch (error) {
    console.error("生成YAML导出时出错：", error);
    return "# 生成YAML导出时出错";
  }
}

export function generateGitHubExport(moduleData) {
  try {
    const { id, cleanData } = getCleanExportData(moduleData);
    const { name, version, creator, description, code, editor, supported = [] } = cleanData;
    
    // Build the GitHub discussion markdown format
    let githubContent = `# ${name}\n\n`;
    githubContent += `**版本：** ${version}  \n`;
    githubContent += `**作者：** ${creator}\n\n`;
    
    // Add supported cards section if any
    if (supported && supported.length > 0) {
      githubContent += `> [!IMPORTANT] \n`;
      githubContent += `> **支持的卡片类型：**\n`;
      
      supported.forEach(card => {
        githubContent += `>  - ${card.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}\n`;
      });
      
      githubContent += `\n`;
    }
    
    // Add description
    if (description) {
      githubContent += `${description}\n`;
      githubContent += `可以通过编辑器或YAML来配置此模块，例如：\n\n`;
    }
    
    // Add configuration example
    githubContent += "```yaml\n";
    githubContent += `${id}: \n`;
    
    // Add example configuration based on editor schema if available
    if (editor && Array.isArray(editor) && editor.length > 0) {
      // Attempt to create an example configuration based on the first field
      const firstField = editor[0];
      if (firstField && firstField.name) {
        githubContent += `    ${firstField.name}: YOUR_VALUE\n`;
      }
    } else {
      githubContent += `    # 在此处填写配置\n`;
    }
    
    githubContent += "```\n\n";
    githubContent += "---\n\n";
    
    // Module install section (collapsible)
    githubContent += "<details>\n\n";
    githubContent += "<summary><b>🧩 获取此模块</b></summary>\n\n";
    githubContent += "<br>\n\n";
    githubContent += "> 使用此模块很简单：从模块商店安装（在任意卡片的编辑器 -> 模块 中），或将以下配置复制并粘贴到您的 `/www/bubble/bubble-modules.yaml` 文件中。\n\n";
    
    // Full YAML definition
    githubContent += "```yaml\n";
    githubContent += `${id}:\n`;
    githubContent += `    name: "${name}"\n`;
    githubContent += `    version: "${version}"\n`;
    githubContent += `    creator: "${creator}"\n`;
    
    // Optional link placeholder
    githubContent += `    link: "https://github.com/Clooos/Bubble-Card/discussions/XXXX"\n\n`;
    
    // Supported cards if any
    if (supported && supported.length > 0) {
      githubContent += `    supported:\n`;
      supported.forEach(card => {
        githubContent += `        - ${card}\n`;
      });
      githubContent += "\n";
    }
    
    // Description with formatting for HTML display
    githubContent += `    description: |\n`;
    if (description) {
      const formattedDesc = description.split('\n').map(line => `        ${line}`).join('\n');
      githubContent += `${formattedDesc}\n`;
      githubContent += `        <br><br>\n`;
      githubContent += `        <code-block><pre>\n`;
      githubContent += `        ${id}: \n`;
      
      // Example based on first editor field
      if (editor && Array.isArray(editor) && editor.length > 0) {
        const firstField = editor[0];
        if (firstField && firstField.name) {
          githubContent += `            ${firstField.name}: YOUR_VALUE\n`;
        } else {
          githubContent += `            # 在此处填写配置\n`;
        }
      } else {
        githubContent += `            # 在此处填写配置\n`;
      }
      
      githubContent += `        </pre></code-block>\n\n`;
    }
    
    // Code section
    githubContent += `    code: |\n`;
    if (code) {
      const formattedCode = code.split('\n').map(line => `        ${line}`).join('\n');
      githubContent += `${formattedCode}\n\n`;
    } else {
      githubContent += `        # 在此处写代码\n\n`;
    }
    
    // Editor schema
    if (editor) {
      const editorYaml = typeof editor === 'object' 
        ? jsyaml.dump(editor, { indent: 2 })
        : editor;
      
      githubContent += `    editor:\n`;
      
      const formattedEditor = editorYaml.split('\n').map(line => `      ${line}`).join('\n');
      githubContent += `${formattedEditor}`;
      
      githubContent += "\n```";
    } else {
      githubContent += "```";
    }
    
    githubContent += "\n\n</details>\n\n";
    githubContent += "---\n\n";
    githubContent += "### 截图:\n\n";
    githubContent += "重要提示：此处的第一张截图将用于模块商店，请务必提供一张。\n";
    
    return githubContent;
  } catch (error) {
    console.error("生成GitHub导出时出错：", error);
    return "# 生成GitHub导出格式时出错";
  }
}

export function copyToClipboard(context, text, successMessage, updatePreviewCallback) {
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    // Use fireToast for notification
    fireToast(context, successMessage, "success");
    
    // Update the preview
    if (typeof updatePreviewCallback === 'function') {
      updatePreviewCallback(text);
    }
  } catch (err) {
    console.error("复制到剪贴板失败：", err);
    fireToast(context, "无法复制到剪贴板。请从下面的预览手动复制。", "error");
    
    if (typeof updatePreviewCallback === 'function') {
      updatePreviewCallback(text);
    }
  }
}

export function downloadModuleAsYaml(context, moduleData, updatePreviewCallback) {
  try {
    const yamlExport = generateYamlExport(moduleData);
    const blob = new Blob([yamlExport], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${moduleData.id}.yaml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Use fireToast for notification
    fireToast(context, "模块已下载为YAML文件！", "success");
    
    // Update the preview
    if (typeof updatePreviewCallback === 'function') {
      updatePreviewCallback(yamlExport);
    }
    
    return true;
  } catch (error) {
    console.error("下载模块时出错：", error);
    fireToast(context, "下载模块时出错: " + error.message, "error");
    return false;
  }
} 