workspace(name = "dm_luigi")

load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")
load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
load("@bazel_tools//tools/build_defs/repo:jvm.bzl", "jvm_maven_import_external")

# =========For generating JSON compilation database====
http_archive(
    name = "bazel_compdb",
    sha256 = "87e376a685eacfb27bcc0d0cdf5ded1d0b99d868390ac50f452ba6ed781caffe",
    strip_prefix = "bazel-compilation-database-0.4.2",
    url = "https://github.com/grailbio/bazel-compilation-database/archive/0.4.2.tar.gz",
)

# ======================Grpc Java======================
git_repository(
    name = "io_grpc_grpc_java",
    remote = "https://github.com/grpc/grpc-java.git",
    tag = "v1.27.0",
)

load("@io_grpc_grpc_java//:repositories.bzl", "grpc_java_repositories")

grpc_java_repositories()

# ======================Grpc C++======================
git_repository(
    name = "com_github_grpc_grpc",
    remote = "https://github.com/grpc/grpc.git",
    tag = "v1.27.0",
)

load("@com_github_grpc_grpc//bazel:grpc_deps.bzl", "grpc_deps")

grpc_deps()

load("@com_github_grpc_grpc//bazel:grpc_extra_deps.bzl", "grpc_extra_deps")

grpc_extra_deps()

# ======================Protobuf======================
load("@com_google_protobuf//:protobuf_deps.bzl", "protobuf_deps")

protobuf_deps()

# Bazel package building & fetching rules.
http_archive(
    name = "rules_pkg",
    sha256 = "6b5969a7acd7b60c02f816773b06fcf32fbe8ba0c7919ccdc2df4f8fb923804a",
    url = "https://github.com/bazelbuild/rules_pkg/releases/download/0.3.0/rules_pkg-0.3.0.tar.gz",
)

# ======================Other Java Utilities======================
jvm_maven_import_external(
    name = "jna",
    artifact = "net.java.dev.jna:jna:jar:5.6.0",
    licenses = ["notice"],  # EPL 1.0
    server_urls = ["https://repo1.maven.org/maven2/"],
)

jvm_maven_import_external(
    name = "mockito",
    artifact = "org.mockito:mockito-core:jar:3.3.3",
    licenses = ["notice"],  # EPL 1.0
    # If URL doesn't work, please refer to https://mvnrepository.com/artifact/org.mockito/mockito-core/3.3.3
    # for update.
    server_urls = ["https://repo1.maven.org/maven2/"],
)

jvm_maven_import_external(
    name = "bytebuddy",
    artifact = "net.bytebuddy:byte-buddy:jar:1.10.9",
    licenses = ["notice"],  # EPL 1.0
    server_urls = ["https://repo1.maven.org/maven2/"],
)

jvm_maven_import_external(
    name = "objenesis",
    artifact = "org.objenesis:objenesis:jar:3.1",
    licenses = ["notice"],  # EPL 1.0
    server_urls = ["https://repo1.maven.org/maven2/"],
)

jvm_maven_import_external(
    name = "org_json",
    artifact = "org.json:json:jar:20210307",
    licenses = ["notice"],  # EPL 1.0
    server_urls = ["https://repo1.maven.org/maven2/"],
)

jvm_maven_import_external(
    name = "junit_junit",
    artifact = "junit:junit:jar:4.13.2",
    licenses = ["notice"],  # EPL 1.0
    server_urls = ["https://repo1.maven.org/maven2/"],
)

jvm_maven_import_external(
    name = "byte_buddy",
    artifact = "net.bytebuddy:byte-buddy:jar:1.11.6",
    licenses = ["notice"],  # EPL 1.0
    server_urls = ["https://repo1.maven.org/maven2/"],
)

jvm_maven_import_external(
    name = "objenesis",
    artifact = "org.objenesis:objenesis:jar:3.2",
    licenses = ["notice"],  # EPL 1.0
    server_urls = ["https://repo1.maven.org/maven2/"],
)

jvm_maven_import_external(
    name = "mockito",
    artifact = "org.mockito:mockito-core:jar:3.3.3",
    licenses = ["notice"],  # EPL 1.0
    # If URL doesn't work, please refer to https://mvnrepository.com/artifact/org.mockito/mockito-core/3.3.3
    # for update.
    server_urls = ["https://repo1.maven.org/maven2/"],
)

jvm_maven_import_external(
    name = "org_mongodb_java_driver",
    artifact = "org.mongodb:mongo-java-driver:jar:3.12.10",
    licenses = ["notice"],  # EPL 2.0
    server_urls = ["https://repo1.maven.org/maven2/"],
)

jvm_maven_import_external(
    name = "com_googlecode_json_simple",
    artifact = "com.googlecode.json-simple:json-simple:1.1.1",
    licenses = ["notice"],  # EPL 2.0
    server_urls = ["https://repo1.maven.org/maven2/"],
)

jvm_maven_import_external(
    name = "s2_geometry_lib",
    artifact = "io.sgr:s2-geometry-library-java:jar:1.0.1",
    licenses = ["notice"],  # EPL 2.0
    server_urls = ["https://repo1.maven.org/maven2/"],
)

jvm_maven_import_external(
    name = "proj4j",
    artifact = "org.locationtech.proj4j:proj4j:jar:1.1.4",
    licenses = ["notice"],  # EPL 2.0
    server_urls = ["https://repo1.maven.org/maven2/"],
)

jvm_maven_import_external(
    name = "javax_mail",
    artifact = "javax.mail:javax.mail-api:jar:1.6.2",
    licenses = ["notice"],  # EPL 2.0
    server_urls = ["https://repo1.maven.org/maven2/"],
)

jvm_maven_import_external(
    name = "javax_activation",
    artifact = "javax.activation:activation:jar:1.1.1",
    licenses = ["notice"],  # EPL 2.0
    server_urls = ["https://repo1.maven.org/maven2/"],
)

jvm_maven_import_external(
    name = "com_sun_mail",
    artifact = "com.sun.mail:javax.mail:jar:1.6.2",
    licenses = ["notice"],  # EPL 2.0
    server_urls = ["https://repo1.maven.org/maven2/"],
)

# ======================DeepMirror======================
git_repository(
    name = "dm_core_apis",
    commit = "fddf76932cbe158149c9ff1873c8bdb96edd7786",
    remote = "https://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@github.com/deepmirrorinc/CoreApis.git",
)

git_repository(
    name = "dm_mario",
    commit = "1296ca6b2d573a7c4a733a474965c7db53378bbf",
    remote = "https://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@github.com/deepmirrorinc/Mario.git",
)

git_repository(
    name = "dm_data_services",
    commit = "1d5cd6e114303b501afdbee33e25c402d5661a6b",
    remote = "https://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@github.com/deepmirrorinc/DataServices.git",
)

# ======================Protos============================
load("@dm_luigi//bazel:luigi_deps.bzl", "luigi_deps")

luigi_deps()

# grpc java
load("@rules_jvm_external//:defs.bzl", "maven_install")
load("@io_grpc_grpc_java//:repositories.bzl", "IO_GRPC_GRPC_JAVA_ARTIFACTS")
load("@io_grpc_grpc_java//:repositories.bzl", "IO_GRPC_GRPC_JAVA_OVERRIDE_TARGETS")
load("@io_grpc_grpc_java//:repositories.bzl", "grpc_java_repositories")
grpc_java_repositories()

# java maven
maven_install(
    artifacts = IO_GRPC_GRPC_JAVA_ARTIFACTS,
    generate_compat_repositories = True,
    override_targets = IO_GRPC_GRPC_JAVA_OVERRIDE_TARGETS,
    repositories = [
        "https://repo.maven.apache.org/maven2/",
    ],
)
load("@maven//:compat.bzl", "compat_repositories")
compat_repositories()
