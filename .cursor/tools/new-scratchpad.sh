Year=$(date +%Y)
Month=$(date +%m)
Day=$(date +%d)

# Create the directory structure
mkdir -p "random/$Year/$Month/$Day"

# Get the local time in the desired format including seconds and timezone in military time
LocalTime=$(date +"%H:%M:%S-%Z")

# Replace ":" with "-" in LocalTime
LocalTimeClean="${LocalTime//:/-}"

# Construct the file name
FileName="$LocalTimeClean.md"

ScratchpadDir=".cursor/scratchpad"

# Create the directory structure
mkdir -p "$ScratchpadDir/$Year/$Month/$Day"

# Full path to the new file
FilePath="$ScratchpadDir/$Year/$Month/$Day/$FileName"

# Create the file
touch "$FilePath"

# Add the template content to the file
cat << 'EOF' > "$FilePath"
# Context & Objectives
_Explain the problem, goals, and any background info._

# Thought Process
_Outline the reasoning steps, brainstormed approaches, and analysis of tradeoffs._

# Decisions & Actions
- **Decision:** [E.g., "Adopt multi-stage Docker builds"]
- **Reasoning:** [Concise justification based on tradeoffs]
- **Next Steps:** [Action items, code changes, etc.]

# Observations & Results
_Record outcomes, test results, and feedback for future reference._
EOF

# Open the file in VSCode
echo "Created new scratchpad: $FilePath"