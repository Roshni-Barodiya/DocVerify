
import UploadFile from "../widgets/UploadFile";
import VerifyFile from "../widgets/VerifyFile";
import Stats from "../widgets/Stats";
import ChartCard from "../widgets/ChartCard";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <motion.div className="dashboard" initial={{ opacity:0 }} animate={{ opacity:1 }}>
      <Stats />
      <ChartCard />
      <UploadFile />
      <VerifyFile />
    </motion.div>
  );
}
